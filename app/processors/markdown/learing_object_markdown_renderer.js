import { ProcessorContentType } from "../content_type.js";
import LearningObjectProcessor from "../learning_object/learing_object_processor.js";
import ProcessingProxy from "../processing_proxy.js";

class LearningObjectMarkdownRenderer {
    learingObjectPrefix = '@learning-object';
    pdfPrefix = '@pdf';
    audioPrefix = '@audio';
    videoPrefix = '@youtube';

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

    link(href, title, text) {
        if (href.startsWith(this.learingObjectPrefix)) {
            // TODO: Process the learning object and render it as defined by the content type.
            // Probably a link to the learning object html, using the ID
            return `<a href=../${href.split(/\/(.+)/, 2)[1]}>Test: ${title} - ${text}</a>`
        } else {
            return false; // Let marked process the link
        }
    };

    image(href, title, text) {
        let proc = new ProcessingProxy();

        if (href.startsWith(this.learingObjectPrefix)) {
            let lproc = new LearningObjectProcessor();
            return lproc.render(href.split(/\/(.+)/, 2)[1]);

        } else if (href.startsWith(this.pdfPrefix)) {
            return proc.render(ProcessorContentType.APPLICATION_PDF, href.split(/\/(.+)/, 2)[1]);

        } else if (href.startsWith(this.audioPrefix)) {
            return proc.render(ProcessorContentType.AUDIO_MPEG, href.split(/\/(.+)/, 2)[1]);

        } else if (href.startsWith(this.videoPrefix)) {
            return proc.render(ProcessorContentType.EXTERN, href.split(/\/(.+)/, 2)[1]);

        } else {
            return false; // Let marked process the link
        }
    };

}

export default LearningObjectMarkdownRenderer