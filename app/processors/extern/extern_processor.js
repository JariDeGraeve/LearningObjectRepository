import Processor from "../processor.js";
import { isValidHttpUrl } from '../../utils/utils.js'
import InvalidArgumentError from '../../utils/invalid_argument_error.js'
import DOMPurify from 'isomorphic-dompurify';
import Logger from "../../logger.js";

let logger = Logger.getLogger()
class ExternProcessor extends Processor {
    constructor() {
        super();
    }

    /**
     * 
     * @param {string} externURL
     * @param {object} args Optional arguments specific to the render function of the ExternProcessor
     * @returns 
     */
    render(externURL, args = { width: "420px", height: "315px" }) {
        if (!isValidHttpUrl(externURL)) {
            throw new InvalidArgumentError("The url is not valid: " + externURL);
        }
        if (!args.width || args.width == "") {
            args.width = "420px";
        }
        if (!args.height || args.height == "") {
            args.height = "315px";
        }
        let regex = /inherit|initial|auto|\d+px|\d+%/
        if (!args.width.match(regex) || !args.height.match(regex)) {
            throw new InvalidArgumentError("The width and/or height of the content are not valid.");

        }

        return DOMPurify.sanitize(`<iframe width="${args.width}" height="${args.height}" src="${externURL}"></iframe>`, { ADD_TAGS: ["iframe"] });

    }
}

export default ExternProcessor;
