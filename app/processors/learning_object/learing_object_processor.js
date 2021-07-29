import Processor from "../processor.js";
import ProcessingProxy from "../processing_proxy.js"

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
        console.log("y u no do this")
        //TODO: Get original learning object data and metadata from the database and pass to the processingproxy with the correct content type.
        return this.processingProxy.render("text/plain", "[This will be a learningObject with ID: " + learningObjectId + "]");
    }
}

export default LearningObjectProcessor;