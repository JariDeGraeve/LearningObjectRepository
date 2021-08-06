import { ProcessorContentType } from "../content_type.js";
import LearningObjectProcessor from "../learning_object/learing_object_processor.js";
import ProcessingProxy from "../processing_proxy.js";
import fs from "fs"
import path from "path"
import UserLogger from "../../utils/user_logger.js";


class LearningObjectMarkdownRenderer {
    learingObjectPrefix = '@learning-object';
    pdfPrefix = '@pdf';
    audioPrefix = '@audio';
    videoPrefix = '@youtube';
    notebookPrefix = '@notebook';
    blocklyPrefix = '@blockly';

    constructor(args = { files: [] }){
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
        let proc = new ProcessingProxy({files: this.args.files});

        if (href.startsWith(this.learingObjectPrefix)) {
            let lproc = new LearningObjectProcessor();
            return lproc.render(href.split(/\/(.+)/, 2)[1]);

        } else if (href.startsWith(this.pdfPrefix)) {
            return proc.render(ProcessorContentType.APPLICATION_PDF, href.split(/\/(.+)/, 2)[1], { files: this.args.files });

        } else if (href.startsWith(this.audioPrefix)) {
            return proc.render(ProcessorContentType.AUDIO_MPEG, href.split(/\/(.+)/, 2)[1], { type: "audio/mpeg", files: this.args.files });

        } else if (href.startsWith(this.videoPrefix)) {
            return proc.render(ProcessorContentType.EXTERN, href.split(/\/(.+)/, 2)[1]);

        } else if (href.startsWith(this.notebookPrefix)) {
            let url = "https://nbviewer.jupyter.org/urls/" + (href.split(/\/(.+)/, 2)[1]).replace(/^https?:\/\//, '');
            return proc.render(ProcessorContentType.EXTERN, url);

        } else if (href.startsWith(this.blocklyPrefix)) {
            if(this.args.files){
                let file = this.args.files.find((f)  => {
                    return f.originalname == href.split(/\/(.+)/, 2)[1];
                });
                if(file){
                    return proc.render(ProcessorContentType.BLOCKLY, file.buffer, { language: "en" });
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