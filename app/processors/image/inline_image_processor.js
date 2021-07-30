import Processor from "../processor.js";
import { isValidHttpUrl } from '../../utils/utils.js'
import InvalidArgumentError from '../../utils/invalid_argument_error.js'
import DOMPurify from 'isomorphic-dompurify';
import Logger from "../../logger.js"
let logger = Logger.getLogger()

class InlineImageProcessor extends Processor {
    constructor() {
        super();
    }

    /**
     * 
     * @param {string} imageUrl 
     * @param {object} args Optional arguments specific to the render function of the InlineImageProcessor
     * @returns 
     */
    render(imageUrl, args = { altText: "" }) {
        if (typeof args.altText == 'undefined') {
            args.altText = "";
        }
        if (!isValidHttpUrl(imageUrl) && (!imageUrl || !imageUrl.match(/^[^.].*\.pdf/))) {
            throw new InvalidArgumentError();
        } else {
            return DOMPurify.sanitize(`<img src="${imageUrl}" alt="${args.altText}">`);
        }
    }
}

export default InlineImageProcessor;