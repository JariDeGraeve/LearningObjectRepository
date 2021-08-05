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
    render(blocklyXml, args = {language: "en"}) {
        if (!args.language || args.language == "") {
            args.language = "en";
        }
        
        let html = `
        <div id="blocklyDiv" style="height: 480px; width: 600px;"></div>
        <script src="../../app/static/js/blockly_compressed.js"></script>
        <script src="../../app/static/js/msg/${args.language}.js"></script>
        <script src="../../app/static/js/msg2/${args.language}.js"></script>
        <script src="../../app/static/js/blocks_compressed.js"></script>
        <script src="../../app/static/js/blocks/arduino.js"></script>
        <script src="../../app/static/js/blocks/comments.js"></script>
        <script src="../../app/static/js/blocks/conveyor.js"></script>
        <script src="../../app/static/js/blocks/drawingrobot.js"></script>
        <script src="../../app/static/js/blocks/dwenguino_new.js"></script>
        <script src="../../app/static/js/blocks/lists.js"></script>
        <script src="../../app/static/js/blocks/procedures.js"></script>
        <script src="../../app/static/js/blocks/socialrobot.js"></script>
        <script src="../../app/static/js/blocks/variables_dynamic.js"></script>
        <script src="../../app/static/js/blocks/variables.js"></script>
        <script>
            let workspace = Blockly.inject('blocklyDiv', {readOnly: true, scrollbars: true, zoom:
         {controls: true,
          wheel: true,
          startScale: 1.0,
          maxScale: 3,
          minScale: 0.3,
          scaleSpeed: 1.2,
          pinch: true}});
            var xml = Blockly.Xml.textToDom('${blocklyXml}');
            Blockly.Xml.domToWorkspace(xml, workspace);
        </script>
        `
        return html;
    }
}

export default BlocklyProcessor;
