import Processor from "../processor.js";
import { isValidHttpUrl } from '../../utils/utils.js'
import InvalidArgumentError from '../../utils/invalid_argument_error.js'
import DOMPurify from 'isomorphic-dompurify';

class AudioProcessor extends Processor {

    constructor() {
        super();
        this.types = ["audio/mpeg"] // TODO add functionality to accept other audio types (ogg, wav)
    }

    /**
     * 
     * @param {string} audioUrl 
     * @param {object} args Optional arguments specific to the render function of the AudioProcessor
     * @returns 
     */
    render(audioUrl, args = {}) {
        if (!isValidHttpUrl(audioUrl) && (!audioUrl || !audioUrl.match(/^(?!http.*$)[^.].*\.mp3/))) {
            throw new InvalidArgumentError("The url for the audio-file is not correct.");
        } else if (!args.type || !this.types.includes(args.type)) {
            throw new InvalidArgumentError("A valid media type has to be given as an argument.");
        } else {
            return DOMPurify.sanitize(`<audio controls>
                <source src="${audioUrl}" type=${args.type}>
                Your browser does not support the audio element.
                </audio>`);
        }
    }
}

export default AudioProcessor;