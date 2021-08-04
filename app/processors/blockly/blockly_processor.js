import Processor from "../processor.js";
import { isValidHttpUrl } from '../../utils/utils.js'
import InvalidArgumentError from '../../utils/invalid_argument_error.js'
import DOMPurify from 'isomorphic-dompurify';
import Logger from "../../logger.js";
import path from "path"

let logger = Logger.getLogger()
class BlocklyProcessor extends Processor {
    constructor() {
        super();
    }

    /**
     * 
     * @param {string} blocklyXml
     * @param {object} args Optional arguments specific to the render function of the BlocklyProcessor
     * @returns 
     */
    render(blocklyXml, args = {}) {
        // TODO: both script files are not passed correctly...
        // currently: file:///Users/jari/Documents/Thuis/Vakantiejob%20UGent/LearningObjectRepository/storage/610aaf4e8719f64c1fa60f5f/blockly_compressed.js
        // expected: file:///Users/jari/Documents/Thuis/Vakantiejob%20UGent/LearningObjectRepository/app/static/js/blockly_compressed.js
        let html = `
        <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
        <script src="blockly_compressed.js"></script>
        <script src="blocks_compressed.js"></script>
        <script>
            let workspace = Blockly.inject('blocklyDiv', {});
            Blockly.Xml.domToWorkspace("${blocklyXml}", workspace);
        </script>
        `
        return html;
    }
}

export default BlocklyProcessor;
