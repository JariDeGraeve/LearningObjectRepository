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
        return html;
    }
}

export default LearningObjectProcessor;