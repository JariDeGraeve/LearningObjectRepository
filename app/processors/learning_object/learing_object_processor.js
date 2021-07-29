import Processor from "../processor.js";
import ProcessingProxy from "../processing_proxy.js"
import { ProcessorContentType } from "../content_type.js";
import fs from "fs"
import path from "path"



class LearningObjectProcessor extends Processor {
    constructor() {
        super();
        this.processingProxy = new ProcessingProxy();
    }

    /**
     * 
     * @param {string} learningObjectId 
     * @param {object} args Optional arguments 
     * @returns 
     */
    render(learningObjectId, args = {}) {
        //TODO: Get original learning object data and metadata from the database and pass to the processingproxy with the correct content type.
        //return this.processingProxy.render("text/plain", "[This will be a learningObject with ID: " + learningObjectId + "]");
        let dirCont = fs.readdirSync(path.resolve(process.env.LEARNING_OBJECT_STORAGE_LOCATION, learningObjectId));
        let htmlFile = dirCont.find((file) => {
            return file.match(/.*\.html/)
        });
        let filename = path.resolve(process.env.LEARNING_OBJECT_STORAGE_LOCATION, learningObjectId, htmlFile);
        let html;
        try {
            html = fs.readFileSync(filename, 'utf8')
        } catch (err) {
            console.error(err)
        }
        // await new Promise((resolve) => {
        //     fs.readFile(filename, 'utf8', (err, data) => {
        //         if (err) {
        //             console.log(err);
        //         }
        //         html = data;
        //         resolve();
        //     });
        // });
        return html;
    }
}

export default LearningObjectProcessor;