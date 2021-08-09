import { ProcessorContentType } from "../content_type.js";
import LearningObjectProcessor from "../learning_object/learing_object_processor.js";
import ProcessingProxy from "../processing_proxy.js";
import fs from "fs"
import path from "path"
import UserLogger from "../../utils/user_logger.js";
import PdfProcessor from "../pdf/pdf_processor.js";
import AudioProcessor from "../audio/audio_processor.js";
import ExternProcessor from "../extern/extern_processor.js";
import BlocklyProcessor from "../blockly/blockly_processor.js";
import { findFile } from "../../utils/file_io.js";


class LearningObjectMarkdownRenderer {
    learingObjectPrefix = '@learning-object';
    pdfPrefix = '@pdf';
    audioPrefix = '@audio';
    videoPrefix = '@youtube';
    notebookPrefix = '@notebook';
    blocklyPrefix = '@blockly';

    constructor(args = { files: [], language: "en" }) {
        this.args = args;
    }

    heading(text, level) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

        return `
                <h${level}>
                    <a name="${escapedText}" class="anchor" href="#${escapedText}">
                    <span class="header-link"></span>
                    </a>
                    ${text}
                </h${level}>`;
    };

    // When the syntax for a link is used => [text](href "title")
    // render a custom link when the prefix for a learning object is used.
    link(href, title, text) {
        if (href.startsWith(this.learingObjectPrefix)) {
            let dirCont = fs.readdirSync(path.resolve(process.env.LEARNING_OBJECT_STORAGE_LOCATION, href.split(/\/(.+)/, 2)[1]));
            let htmlFile = dirCont.find((file) => {
                return file.match(/.*\.html/)
            });
            return `<a href=../${href.split(/\/(.+)/, 2)[1]}/${htmlFile}><b>${title}</b> - ${text}</a>`
        } else {
            return false; // Let marked process the link
        }
    };

    // When the syntax for an image is used => ![text](href "title")
    // render a learning object, pdf, audio or video if a prefix is used.
    image(href, title, text) {

        if (href.startsWith(this.learingObjectPrefix)) {
            let proc = new LearningObjectProcessor();
            return proc.render(href.split(/\/(.+)/, 2)[1]);

        } else if (href.startsWith(this.pdfPrefix)) {
            let proc = new PdfProcessor();
            return proc.render(href.split(/\/(.+)/, 2)[1], { files: this.args.files });

        } else if (href.startsWith(this.audioPrefix)) {
            let proc = new AudioProcessor();
            return proc.render(href.split(/\/(.+)/, 2)[1], { type: "audio/mpeg", files: this.args.files });

        } else if (href.startsWith(this.videoPrefix)) {
            let proc = new ExternProcessor();
            return proc.render(href.split(/\/(.+)/, 2)[1]);

        } else if (href.startsWith(this.notebookPrefix)) {
            let proc = new ExternProcessor();
            let url = "https://nbviewer.jupyter.org/urls/" + (href.split(/\/(.+)/, 2)[1]).replace(/^https?:\/\//, '');
            return proc.render(url);

        } else if (href.startsWith(this.blocklyPrefix)) {
            let proc = new BlocklyProcessor();
            if (this.args.files) {
                let file = findFile(href.split(/\/(.+)/, 2)[1], this.args.files)
                if (file) {
                    return proc.render(file.buffer, { language: this.args.language });
                }

            }
            UserLogger.error("The blockly preview could not load. Are you sure the correct xml file was passed?")
            return "";
        } else {

            return false; // Let marked process the link
        }
    };

}

export default LearningObjectMarkdownRenderer