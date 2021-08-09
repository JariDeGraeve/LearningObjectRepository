import marked from 'marked'
import DOMPurify from 'isomorphic-dompurify';
import LearningObjectMarkdownRenderer from './learing_object_markdown_renderer.js';
import ObjectConverter from '../../utils/object_converter.js';
import yaml from "js-yaml"
import Logger from '../../logger.js';
import Processor from '../processor.js';
import InvalidArgumentError from "../../utils/invalid_argument_error.js"
import UserLogger from '../../utils/user_logger.js';

class MarkdownProcessor extends Processor {
    logger = Logger.getLogger();
    constructor(args = { files: [], language: "en" }) {
        super();
        // A bit stupid but marked does not work with an instance of a class only with plain object
        const renderer = new ObjectConverter().toJSON(new LearningObjectMarkdownRenderer(args));
        marked.use({ renderer });

    }

    /**
     * 
     * @param {string} mdText Plain markdown string to be converted to html. May contain links to learning objects which results in recursive processing.
     * @returns The sanitized version of the generated html.
     */
    render(mdText, args = {}) {
        let html = "";
        try {
            html = marked(mdText); //DOMPurify.sanitize(marked(mdText), { ADD_TAGS: ["embed", "iframe", "script"] });
        } catch (e) {
            throw new InvalidArgumentError(e.message);
        }
        return html;
    }

    /**
     * 
     * @param {string} mdTextWithYAMLMeta Markdown string with metadata. Compatible with jekyll (https://jekyllrb.com/docs/front-matter/)
     * @returns {object} {original input, metadata string, }
     */
    static stripYAMLMetaData(mdTextWithYAMLMeta) {
        let trimmedInput = mdTextWithYAMLMeta.trim();
        const metadataregex = /(?<=^---).+?(?=---)/s
        const mdregex = /(?<=---.*---).+?$/s
        let metadataText = trimmedInput.match(metadataregex);
        let mdText = "";

        if (metadataText) {
            // Yes, metadata
            metadataText = metadataText[0].trim();
            mdText = trimmedInput.match(mdregex);
            mdText = mdText ? mdText[0].trim() : "";
        } else {
            // No metadata
            metadataText = "";
            mdText = trimmedInput;
        }

        let metadata = {};
        try {
            metadata = yaml.load(metadataText);
        } catch (e) {
            Logger.getLogger().error(`Unable to convert metadata to YAML: ${e}`);
            UserLogger.error(`There is an syntax-error in the metadata: ${e}`);
        }
        return {
            original: mdTextWithYAMLMeta,
            metadata: metadata,
            markdown: mdText
        }
    }
}

export default MarkdownProcessor;