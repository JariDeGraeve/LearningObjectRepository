import Processor from "../processor.js";
import { isValidHttpUrl } from '../../utils/utils.js'
import InvalidArgumentError from '../../utils/invalid_argument_error.js'
import DOMPurify from 'isomorphic-dompurify';
import UserLogger from '../../utils/user_logger.js'


class PdfProcessor extends Processor {
    constructor() {
        super();
    }

    /**
     * 
     * @param {string} pdfUrl 
     * @param {object} args Optional arguments specific to the render function of the PdfProcessor
     * @returns 
     */
    render(pdfUrl, args = { files: [] }) {
        if(!args.files || args.files.length <= 0){
            UserLogger.error("The pdf file cannot be found. Please check if the filename is spelled correctly.")
            return "";
        }
        let filenames = args.files.map((f) => f.originalname);
        if(!filenames.includes(pdfUrl.split("/").pop())){
            UserLogger.error("The pdf file cannot be found. Please check if the filename is spelled correctly.")
            return "";
        }
        if (!isValidHttpUrl(pdfUrl) && (!pdfUrl || !pdfUrl.match(/^(?!http.*$)[^.].*\.pdf/))) {
            throw new InvalidArgumentError("The pdf url is not valid.");
        } 

        return DOMPurify.sanitize(`<embed src="${pdfUrl}" type="application/pdf" width="100%" height="800px""/>`, { ADD_TAGS: ["embed"] })

    }
}

export default PdfProcessor;