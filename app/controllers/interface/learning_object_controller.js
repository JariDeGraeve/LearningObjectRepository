import Logger from "../../logger.js"
import multer from "multer"
import { uploadFilesMiddleware } from "../../utils/upload.js"
import MarkdownProcessor from '../../processors/markdown/markdown_processor.js'
import LearningObject from "../../models/learning_object.js"
import fs from "fs"
import path from "path"
import crypto from 'crypto'
import mkdirp from "mkdirp"
import ProcessingProxy from "../../processors/processing_proxy.js"
import { ProcessorContentType } from "../../processors/content_type.js"
import yaml from "js-yaml"
import MetadataValidator from "./metadata_validator.js"
import UserLogger from '../../utils/user_logger.js'
import InvalidArgumentError from "../../utils/invalid_argument_error.js"
import LearningObjectRepository from "../../repository/learning_object_repository.js"


let logger = Logger.getLogger()

let learningObjectController = {}

learningObjectController.readLearningObject = (req, res) => {

};

learningObjectController.getCreateLearningObject = (req, res) => {
    res.render('interface/learning_object/learning_object.create.ejs', {
        hello: "Hello learning object!"
    });
};

learningObjectController.getAllLearningObjects = async (req, res) => {
    let objects = await learningObjectController.findAllObjects();

    let sortHruid = (a, b) => a.hruid < b.hruid ? -1 : a.hruid > b.hruid ? 1 : 0
    let sortLanguage = (a, b) => a.language < b.language ? -1 : a.language > b.language ? 1 : 0
    let sortVersion = (a, b) => a.version < b.version ? -1 : a.version > b.version ? 1 : 0

    res.render('interface/learning_object/learning_object.all.ejs', {
        hello: "Hello learning object!",
        objects: objects.sort((a, b) => sortHruid(a, b) || sortLanguage(a, b) || sortVersion(a, b))
    });
};

/**
 * Finds all hruid's and id's from existing learning-objects
 * @returns array of objects with id, hruid and url to learning object. It also contains a boolean to check if object is available
 */
learningObjectController.findAllObjects = async () => {
    let repos = new LearningObjectRepository();
    let objects;
    await new Promise((resolve) => {
        repos.findAll((err, res) => {
            if (err) {
                logger.error("Could not retrieve all objects from database: " + err.message);
            }
            objects = res;
            resolve();
        })
    });

    return objects.map((obj) => { return { id: obj._id.toString(), hruid: obj.hruid, language: obj.language, version: obj.version, available: obj.available, url: path.join("/api/learningObject/getContent/", obj._id.toString()) } });
}

learningObjectController.findMarkdownIndex = (files) => {
    let indexregex = /.*index.md$/
    for (let i = 0; i < files.length; i++) {
        if (files[i]["originalname"].match(indexregex)) {
            return files[i];
        }
    }
};

/**
 * Finds the metadata.md or metadata.yaml file among the files
 * @param {array} files 
 * @returns the metadata file.
 */
learningObjectController.findMetadataFile = (files) => {
    let regex = /.*metadata\.(md|yaml)$/;
    return files.find((file) => {
        return file["originalname"].match(regex);
    });

}


/**
 * Process the correct file given the content type if a metadata.md or metadata.yaml file is used.
 * If a index.md file is used, the content type should be text/markdown and this function shouldn't be called,
 * because no other file needs to be processed other than index.md.
 * @param {array} files 
 * @param {string} contentType 
 * @returns name and content for the new html file together with the source files that need to be saved.
 */
learningObjectController.processFiles = (files, contentType, metadata = {}) => {
    logger.info("Find file for type: " + contentType);
    // Filter metadata files or hidden files (like .DS_Store on macOS)
    let filtered = files.filter((f) => {
        let ignoreregex = /(.*metadata\.((md)|(yaml)))|(^\..*)$/;
        return !f["originalname"].match(ignoreregex);
    })
    let inputString = "";
    let resFiles = [];
    let args = {};
    let constrArgs = {};
    // Find the first file with the correct content type (+ define the inputstring)
    let file = filtered.find((f) => {
        let ext = path.extname(f.originalname);
        switch (contentType) {
            case ProcessorContentType.IMAGE_INLINE: case ProcessorContentType.IMAGE_BLOCK:
                // Find image file
                if (ext.match(/\.(jpe?g)|(png)|(svg)$/)) {
                    inputString = f["originalname"]
                    args = metadata.args ? { width: metadata.args.width, height: metadata.args.height } : {}

                    resFiles.push(f);
                    return true;
                }
                break;
            case ProcessorContentType.TEXT_MARKDOWN:
                // Find markdown file
                if (ext == ".md") {
                    inputString = f.buffer.toString('utf8');
                    // add files to contstructor args (passed to renderer to check if referenced files exist)
                    constrArgs.files = filtered;
                    constrArgs.language = metadata.language;
                    resFiles = files;
                    return true;
                }
                break;
            case ProcessorContentType.TEXT_PLAIN:
                // Find text file
                if (ext == ".txt") {
                    inputString = f.buffer.toString('utf8');
                    resFiles.push(f);
                    return true;
                }
                break;
            case ProcessorContentType.AUDIO_MPEG:
                // Find audio file
                if (ext == ".mp3") {
                    inputString = f["originalname"]
                    // add files to args to check if file exists
                    args.files = filtered;
                    args.type = "audio/mpeg"
                    resFiles.push(f);
                    return true;
                }
                break;
            case ProcessorContentType.APPLICATION_PDF:
                // Find pdf file
                if (ext == ".pdf") {
                    inputString = f["originalname"]
                    // add files to args to check if file exists
                    args.files = filtered;
                    resFiles.push(f);
                    return true;
                }
                break;
            case ProcessorContentType.BLOCKLY:
                // Find pdf file
                if (ext == ".xml") {
                    inputString = f.buffer.toString('utf8');
                    args.language = metadata.language
                    resFiles.push(f);
                    return true;
                }
                break;
            default:
                //Not supposed to happen
                logger.error("Coudn't process this content type: " + contentType);
                break;
        }
        return false
    });
    logger.info("Processing file " + file["originalname"]);
    let proc = new ProcessingProxy(constrArgs);
    return [proc.render(contentType, inputString, args), resFiles];
};

/**
 * 
 * @param {string} md - markdown that needs to be processed (from index.md)
 * @param {array} files - all files (need to be passed for checking purposes)
 * @returns 
 */
learningObjectController.processMarkdown = (md, files, language) => {
    let filtered = files.filter((f) => {
        let ignoreregex = /(.*index\.md)|(^\..*)$/;
        return !f["originalname"].match(ignoreregex);
    })
    let proc = new ProcessingProxy({ files: filtered, language: language })
    return proc.render(ProcessorContentType.TEXT_MARKDOWN, md);
};

/**
 * Extract the metadata from the metadata file (or index.md) together with the file.
 * @param {array} files 
 * @returns the metadata and if a index.md file is used also returns the new html filename and content.
 */
learningObjectController.extractMetadata = (files) => {
    // index.md 
    let indexfile = learningObjectController.findMarkdownIndex(files);  // Look for the index markdown file
    if (indexfile) {

        let mdString = indexfile.buffer.toString('utf8');   // Read index markdown file into string

        let splitdata = MarkdownProcessor.stripYAMLMetaData(mdString);   // Strip metadata and markdown from eachother

        return [splitdata.metadata, indexfile, splitdata.markdown];
    } else {
        // metadata.md or metadata.yaml
        let metadatafile = learningObjectController.findMetadataFile(files);
        if (metadatafile) {
            // check if metadata.md or metadata.yaml
            if (metadatafile.originalname.includes(".md")) {
                // metadata.md
                let mdString = metadatafile.buffer.toString('utf8');   // Read index markdown file into string
                let splitdata = MarkdownProcessor.stripYAMLMetaData(mdString);   // Strip metadata and markdown from eachother
                return [splitdata.metadata, metadatafile];
            } else {
                // metadata.yaml
                let metadataText = metadatafile.buffer.toString('utf8').trim();

                // convert metadata to yaml
                let metadata = {};
                try {
                    metadata = yaml.load(metadataText);
                } catch (e) {
                    logger.error(`Unable to convert metadata to YAML: ${e}`);
                    UserLogger.error(`There is an syntax-error in the metadata: ${e}`);
                }
                return [metadata, metadatafile];
            }
        } else {
            logger.error("There is no index.md, metadata.md or metadata.yaml file!")
        }
    }

};

/**
 * Write the html file.
 * @param {string} destination - destination of html file (storage)
 * @param {string} htmlFile - name of html file
 * @param {string} htmlString - content of html
 */
learningObjectController.writeHtmlFile = async (destination, htmlFile, htmlString) => {
    let htmlFileFull = path.join(destination, htmlFile);
    mkdirp.sync(path.dirname(htmlFileFull));
    await new Promise((resolve) => {
        fs.writeFile(htmlFileFull, htmlString, "utf8", function (err) {
            if (err) {
                console.log(err);
            }
            resolve();
        });
    });

};

/**
 * Saves all necessary source files in storage.
 * @param {array} files 
 * @param {string} destination - location for storage
 */
learningObjectController.saveSourceFiles = (files, destination) => {
    for (const elem of files) {
        let filename = path.join(destination, elem.originalname);

        mkdirp.sync(path.dirname(filename));
        if (elem.isDir) {
            // save subdirectory
            learningObjectController.saveSourceFiles(elem.sub, path.join(destination, elem.originalname));
        } else {
            fs.writeFileSync(filename, elem.buffer);
        }
    }
}



learningObjectController.createLearningObject = async (req, res) => {
    logger.info("Trying to create learning object");
    try {
        //await uploadFilesMiddleware(req, res);

        // Extract metadata and the metadata filename from files (if there's a index.md file, the html filename and html string are also extracted)
        let [metadata, metadataFile, markdown] = learningObjectController.extractMetadata(req.files);

        // Validate metadata
        let ids = await learningObjectController.findAllObjects();
        let val = new MetadataValidator(metadata, ids);

        let valid;

        [metadata, valid] = val.validate();

        if (!valid) {
            throw new InvalidArgumentError("The metadata is not correctly formatted. See user.log for more info.")
        }
        logger.info("Correct metadata for learning object with hruid '" + metadata.hruid + "' found in '" + metadataFile.originalname + "'");
        let existing = ids.find((o) => o.hruid == metadata.hruid && o.language == metadata.language && o.version == metadata.version)
        let id;
        let repos = new LearningObjectRepository();
        let dbError = false;

        if (existing) {
            // hruid, language and version need to be uniqe => update existing object
            //const learningObject = new LearningObject(metadata);
            //learningObject['_id'] = existing.id;
            id = existing.id;
            // update metadata in database
            await new Promise((resolve) => {
                repos.update(id, (err) => {
                    if (err) {
                        logger.error("The object with hruid '" + metadata.hruid + "' could not be updated: " + err.message);
                        UserLogger.error("The object with hruid '" + metadata.hruid + "' could not be updated due to an error with the database or with the metadata.")
                        dbError = true;
                    }
                    logger.info("The metadata for the object with hruid '" + metadata.hruid + "' has been updated correctly.");
                    resolve();
                })
            });
        } else {
            // Create learning object
            const learningObject = new LearningObject(metadata);
            id = learningObject['_id'].toString();
            // save metadata in database
            await new Promise((resolve) => {
                repos.save(learningObject, (err) => {
                    if (err) {
                        logger.error("The object with hruid '" + learningObject.hruid + "' could not be saved: " + err.message);
                        UserLogger.error("The object with hruid '" + learningObject.hruid + "' could not be saved due to an error with the database or with the metadata.")
                        dbError = true;
                    }
                    logger.info("The metadata for the object with hruid '" + learningObject.hruid + "' has been saved correctly.");
                    resolve();
                })
            });

        }

        if (!dbError) {
            let destination = path.join(path.resolve(process.env.LEARNING_OBJECT_STORAGE_LOCATION), id); // Use unique learning object id to define storage location
            let resFiles;
            let htmlString
            if (metadataFile.originalname.includes("metadata.")) {
                // If the metadata comes from a metadata.md or metadata.yaml file the correct content file needs to be processed
                // This is how we get the html filename and html string.
                // It also returns the nescessary files that need to be saved.
                [htmlString, resFiles] = learningObjectController.processFiles(req.files, metadata.content_type, metadata);

            } else {
                // If a index.md file is used, all other files need to be stored aswell because they can be used in the markdown
                htmlString = learningObjectController.processMarkdown(markdown, req.files, metadata.language);

                resFiles = req.files.filter((f) => !f.originalname.match(/.*(index\.md|metadata\.(md|yaml))$/));
            }

            // Write html file
            learningObjectController.writeHtmlFile(destination, "index.html", htmlString);

            // Save all source files
            learningObjectController.saveSourceFiles(resFiles, destination);

            if (existing) {
                UserLogger.info("The learning-object with hruid '" + metadata.hruid + "' and id '" + id + "' was updated correctly");

            } else {
                UserLogger.info("The learning-object with hruid '" + metadata.hruid + "' was created correctly with id " + id);

            }

        }

    } catch (error) {
        logger.error(error.message);

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            //return res.send("Too many files to upload.");
        }
        //return res.send(`Error when trying upload many files: ${error}`);
    }
};


learningObjectController.updateLearningObject = (req, res) => {

};

learningObjectController.deleteLearningObject = (req, res) => {

};

export default learningObjectController;