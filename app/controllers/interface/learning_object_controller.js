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


let logger = Logger.getLogger()

let learningObjectController = {}

learningObjectController.readLearningObject = (req, res) => {

};

learningObjectController.getCreateLearningObject = (req, res) => {
    res.render('interface/learning_object/learning_object.create.ejs', {
        hello: "Hello learning object!"
    });
};

learningObjectController.getAllLearningObjects = (req, res) => {
    let objects = learningObjectController.findAllObjectHRUIDandIDs();

    res.render('interface/learning_object/learning_object.all.ejs', {
        hello: "Hello learning object!",
        objects: objects
    });
};

learningObjectController.findAllObjectHRUIDandIDs = () => {
    let res = []
    let dirCont = fs.readdirSync(path.resolve(process.env.LEARNING_OBJECT_STORAGE_LOCATION));

    dirCont = dirCont.filter((file) => {
        return file.charAt(0) != "."
    });

    dirCont.forEach(id => {
        let files = fs.readdirSync(path.resolve(process.env.LEARNING_OBJECT_STORAGE_LOCATION, id));
        files = files.map((f) => {
            return { originalname: f, buffer: fs.readFileSync(path.resolve(process.env.LEARNING_OBJECT_STORAGE_LOCATION, id, f)) };
        });
        let [metadata] = learningObjectController.extractMetadata(files)
        let url = path.join("/api/learningObject/getContent/", id);
        res.push({ id: id, hruid: metadata.hruid, available: metadata.available, url: url });
    });
    return res;
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
                    args = metadata.args ? { width: metadata.args.width , height: metadata.args.height } : { }

                    resFiles.push(f);
                    return true;
                }
                break;
            case ProcessorContentType.TEXT_MARKDOWN:
                // Find markdown file
                if (ext == ".md") {
                    inputString = f.buffer.toString('utf8');
                    // add supplimentary files to args? (eg: check if url to file exists)
                    constrArgs.files = filtered;
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

learningObjectController.processMarkdown = (md, files) => {
    let filtered = files.filter((f) => {
        let ignoreregex = /(.*index\.md)|(^\..*)$/;
        return !f["originalname"].match(ignoreregex);
    })
    let proc = new MarkdownProcessor({files: filtered});
    return proc.render(md);
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

        // let proc = new MarkdownProcessor();

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
                // let proc = new MarkdownProcessor();
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
                    this.logger.error(`Unable to convert metadata to YAML: ${e}`);
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
// learningObjectController.saveSourceFiles = async (files, destination) => {
learningObjectController.saveSourceFiles = (files, destination) => {
    //TODO also save subdirs
    for (const elem of files) {
        let filename = path.join(destination, elem.originalname);
        mkdirp.sync(path.dirname(filename));
        fs.writeFileSync(filename, elem.buffer);
        // await new Promise((resolve) => {
        //     fs.writeFile(filename, elem.buffer, function (err, data) {
        //         if (err) {
        //             console.log(err);
        //         }
        //         resolve();
        //     });
        // });
    }
}



learningObjectController.createLearningObject = async (req, res) => {
    logger.info("Trying to upload files");
    try {
        //await uploadFilesMiddleware(req, res);
        // for (let i = 0; i < req.files.length; i++) {
        //     req.files[i].originalname = path.join(...req.files[i].originalname.split(path.sep).slice(1));
        // }
        logger.info("Extracting metadata...");

        // Extract metadata and the metadata filename from files (if there's a index.md file, the html filename and html string are also extracted)
        let [metadata, metadataFile, markdown] = learningObjectController.extractMetadata(req.files);
        logger.info("Metadata found in " + metadataFile.originalname);

        // Validate metadata
        logger.info("Validating metadata...");
        let ids = learningObjectController.findAllObjectHRUIDandIDs();
        let val = new MetadataValidator(metadata, ids);

        let valid;

        [metadata, valid] = val.validate();


        if (!valid) {
            throw new InvalidArgumentError("The metadata is not correctly formatted. See user.log for more info.")
        }

        // Create learning object
        const learningObject = new LearningObject(metadata);


        const id = learningObject['_id'].toString();
        let destination = path.join(path.resolve(process.env.LEARNING_OBJECT_STORAGE_LOCATION), id); // Use unique learning object id to define storage location
        let resFiles;
        let htmlString
        if (metadataFile.originalname.includes("metadata.")) {
            // If the metadata comes from a metadata.md or metadata.yaml file the correct content file needs to be processed
            // This is how we get the html filename and html string.
            // It also returns the nescessary files that need to be saved.
            [htmlString, resFiles] = learningObjectController.processFiles(req.files, learningObject.content_type, metadata);

            resFiles.push(metadataFile);
        } else {
            // If a index.md file is used, all other files need to be stored aswell because they can be used in the markdown
            htmlString = learningObjectController.processMarkdown(markdown, req.files);

            resFiles = req.files;
        }

        // Write html file
        learningObjectController.writeHtmlFile(destination, "index.html", htmlString);


        // Save all source files
        learningObjectController.saveSourceFiles(resFiles, destination);

        if (req.files.length <= 0) {
            //return res.send(`You must select at least 1 file.`);
        }
        UserLogger.info("The learning-object with hruid " + learningObject.hruid + " was created correctly with id " + id);
        //let redirectpath = path.join("/", process.env.LEARNING_OBJECT_STORAGE_LOCATION, id);
        //return res.redirect(redirectpath);
        //return res.sendfile(indexfile_html_full);
        //return res.send(`Files has been uploaded.`);

        // TODO: Add id to metadata and save to database


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