/**
 * @license
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Dwenguino conveyor blocks for Blockly
 * @author jari.degraeve@ugent.be   (Jari De Graeve)
 */
'use strict';

// goog.provide('Blockly.Blocks.conveyor');

// goog.require('Blockly.Blocks');
// goog.require('Blockly.Arduino');


var DwenguinoHelpUrl = "http://www.dwengo.org/blockly";

// Blockly.Blocks.conveyor.HUE = 180;

var conveyor_belt_json = {
  "id": "conveyor_belt",
  "message0": MSG.conveyor.conveyorBlock + " %1 %2 %3" + MSG.conveyor.conveyorSpeed + " %4 ",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/conveyor/conveyor.png",
      "width": 100,
      "height": 120,
      "alt": "*"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "speed",
      "check": "Number"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 180,
  "tooltip": "",
  "helpUrl": "http://www.dwengo.org/tutorials"

};

Blockly.Blocks['conveyor_belt'] = {
  init: function () {
    this.jsonInit(conveyor_belt_json);
  }
};


var conv_button_json = {
  "id": "conveyor_button",
  "message0": MSG.conveyor.buttonBlock + "%1 %2" + MSG.conveyor.pin + "%3",
  "args0": [
    {
      "type": "field_image",
      "src": "../../app/static/img/conveyor/button.png",
      "width": 30,
      "height": 30,
      "alt": "*"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "pin",
      "check": "Number"
    }
  ],
  "output": "Number",
  "colour": 180,
  "tooltip": "",
  "helpUrl": DwenguinoHelpUrl
};

Blockly.Blocks['conveyor_button'] = {
  init: function () {
    this.jsonInit(conv_button_json);
  }
};


var color_sensor_json = {
  "id": "conveyor_color_sensor",
  "message0": MSG.conveyor.rgbSensorBlock + "%1 %2 %3" + MSG.conveyor.rgbSensorPin + "%4",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/conveyor/rgb_sensor.png",
      "width": 80,
      "height": 80,
      "alt": "*"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "pin",
      "check": "Number"
    }
  ],
  "output": "Color",
  "colour": 180,
  "tooltip": "",
  "helpUrl": DwenguinoHelpUrl
};

Blockly.Blocks['conveyor_color_sensor'] = {
  init: function () {
    this.jsonInit(color_sensor_json);
  }
};



var conveyor_ledstrip_json = {
  "id": "conveyor_ledstrip",
  "message0": MSG.conveyor.ledStripBlock + " %1 " + MSG.conveyor.clockPin + " %2 " + MSG.conveyor.dataPin + " %3 ",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "clockPin",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "dataPin",
      "check": "Number"
    },
  ],
  "message1": MSG.conveyor.colorBlock + "1 %1",
  "args1": [
    {
      "type": "input_value",
      "name": "color1",
      "check": "Color"
    },
  ],
  "message2": MSG.conveyor.colorBlock + "2 %1",
  "args2": [
    {
      "type": "input_value",
      "name": "color2",
      "check": "Color"
    },
  ],
  "message3": MSG.conveyor.colorBlock + "3 %1",
  "args3": [
    {
      "type": "input_value",
      "name": "color3",
      "check": "Color"
    },
  ],
  "message4": MSG.conveyor.colorBlock + "4 %1",
  "args4": [
    {
      "type": "input_value",
      "name": "color4",
      "check": "Color"
    },
  ],
  "message5": MSG.conveyor.colorBlock + "5 %1",
  "args5": [
    {
      "type": "input_value",
      "name": "color5",
      "check": "Color"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 180,
  "tooltip": "",
  "helpUrl": "http://www.dwengo.org/tutorials"

};

Blockly.Blocks['conveyor_ledstrip'] = {
  init: function () {
    this.jsonInit(conveyor_ledstrip_json);
  }
};

let colors = [
  [MSG.conveyor.noColor, "noColor"],
  [MSG.conveyor.black, "black"],
  [MSG.conveyor.white, "white"],
  [MSG.conveyor.gray, "gray"],
  [MSG.conveyor.red, "red"],
  [MSG.conveyor.orange, "orange"],
  [MSG.conveyor.yellow, "yellow"],
  [MSG.conveyor.greenyellow, "greenyellow"],
  [MSG.conveyor.green, "green"],
  [MSG.conveyor.cyan, "cyan"],
  [MSG.conveyor.blue, "blue"],
  [MSG.conveyor.purple, "purple"],
  [MSG.conveyor.pink, "pink"],
  [MSG.conveyor.magenta, "magenta"]
]
var conveyor_color_json = {
  "id": "conveyor_color",
  "message0": MSG.conveyor.color + "%1",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "COLOR_DROPDOWN",
      "options": colors
    }
  ],
  "output": "Color",
  "colour": 180,
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['conveyor_color'] = {
  init: function () {
    this.jsonInit(conveyor_color_json);
  }
};

var conveyor_rgb_color_json = {
  "id": "conveyor_rgb_color",
  "message0": MSG.conveyor.red + "%1 " + MSG.conveyor.green + "%2 " + MSG.conveyor.blue + "%3 ",
  "type": "rgb_color",
  "args0": [
    {
      "type": "field_number",
      "name": "RED",
      "value": 133,
      "min": 0,
      "max": 255,
      "precision": 0
    },
    {
      "type": "field_number",
      "name": "GREEN",
      "value": 196,
      "min": 0,
      "max": 255,
      "precision": 0
    },
    {
      "type": "field_number",
      "name": "BLUE",
      "value": 65,
      "min": 0,
      "max": 255,
      "precision": 0
    }
  ],
  "inputsInline": true,
  "output": "Color",
  "colour": 180,
  "tooltip": "",
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['conveyor_rgb_color'] = {
  init: function () {
    this.jsonInit(conveyor_rgb_color_json);
  }
};

var conveyor_rgb_color_with_numbers_json = {
  "id": "conveyor_rgb_color_with_numbers",
  "message0": MSG.conveyor.red + "%1 " + MSG.conveyor.green + "%2 " + MSG.conveyor.blue + "%3 ",
  "type": "rgb_color",
  "args0": [
    {
      "type": "input_value",
      "name": "RED",
      "value": 100,
      "min": 0,
      "max": 255,
      "precision": 0

    },
    {
      "type": "input_value",
      "name": "GREEN",
      "value": 100,
      "min": 0,
      "max": 255,
      "precision": 0
    },
    {
      "type": "input_value",
      "name": "BLUE",
      "value": 100,
      "min": 0,
      "max": 255,
      "precision": 0
    }
  ],
  "inputsInline": true,
  "output": "Color",
  "colour": 180,
  "tooltip": "",
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['conveyor_rgb_color_with_numbers'] = {
  init: function () {
    this.jsonInit(conveyor_rgb_color_with_numbers_json);
  }
};

var similar_color_json = {
  "id": "similar_color",
  "message0": MSG.conveyor.color + " %1 " + MSG.conveyor.isSimilar + " " + MSG.conveyor.color + " %2 " + MSG.conveyor.withDifference,
  "args0": [
    {
      "type": "input_value",
      "name": "colorA",
      "check": "Color"
    },
    {
      "type": "input_value",
      "name": "colorB",
      "check": "Color"
    },
    {
      "type": "field_number",
      "name": "diff",
      "value": 20,
      "min": 0,
      "max": 100,
      "precision": 0
    }
  ],
  "inputsInline": true,
  "output": "Boolean",
  "colour": 180,
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['similar_color'] = {
  init: function () {
    this.jsonInit(similar_color_json);
  }
};
