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
 * @fileoverview Dwenguino social robot blocks for Blockly.
 * @author zimcke.vandestaey@ugent.be
 */
'use strict';

// goog.provide('Blockly.Blocks.socialrobot');

// goog.require('Blockly.Blocks');
// goog.require('Blockly.Arduino');


var DwenguinoHelpUrl = "http://www.dwengo.org/blockly";

// Blockly.Blocks.socialrobot.HUE = 25;

var ledmatrixDropdown = [
  ["1", "0"],
  ["2", "1"],
  ["3", "2"],
  ["4", "3"]
];

let eyePatternDropdown = [
  [Blockly.Msg['ledmatrix']['restPosition'], '0'],
  [Blockly.Msg['ledmatrix']['blink1'], '1'],
  [Blockly.Msg['ledmatrix']['blink2'], '2'],
  [Blockly.Msg['ledmatrix']['blink3'], '3'],
  [Blockly.Msg['ledmatrix']['blink4'], '4'],
  [Blockly.Msg['ledmatrix']['blink5'], '5'],
  [Blockly.Msg['ledmatrix']['right1'], '6'],
  [Blockly.Msg['ledmatrix']['right2'], '7'],
  [Blockly.Msg['ledmatrix']['left1'], '8'],
  [Blockly.Msg['ledmatrix']['left2'], '9'],
  [Blockly.Msg['ledmatrix']['up1'], '11'],
  [Blockly.Msg['ledmatrix']['up2'], '12'],
  [Blockly.Msg['ledmatrix']['up3'], '13'],
  [Blockly.Msg['ledmatrix']['down1'], '14'],
  [Blockly.Msg['ledmatrix']['down2'], '15'],
  [Blockly.Msg['ledmatrix']['down3'], '16'],
  [Blockly.Msg['ledmatrix']['angryLeft1'], '17'],
  [Blockly.Msg['ledmatrix']['angryLeft2'], '18'],
  [Blockly.Msg['ledmatrix']['angryLeft3'], '19'],
  [Blockly.Msg['ledmatrix']['angryLeft4'], '20'],
  [Blockly.Msg['ledmatrix']['angryRight1'], '22'],
  [Blockly.Msg['ledmatrix']['angryRight2'], '23'],
  [Blockly.Msg['ledmatrix']['angryRight3'], '24'],
  [Blockly.Msg['ledmatrix']['angryRight4'], '25'],
  [Blockly.Msg['ledmatrix']['sadLeft1'], '27'],
  [Blockly.Msg['ledmatrix']['sadLeft2'], '28'],
  [Blockly.Msg['ledmatrix']['sadLeft3'], '29'],
  [Blockly.Msg['ledmatrix']['sadRight1'], '32'],
  [Blockly.Msg['ledmatrix']['sadRight2'], '33'],
  [Blockly.Msg['ledmatrix']['sadRight3'], '34'],
  [Blockly.Msg['ledmatrix']['evilLeft1'], '37'],
  [Blockly.Msg['ledmatrix']['evilLeft2'], '38'],
  [Blockly.Msg['ledmatrix']['evilRight1'], '39'],
  [Blockly.Msg['ledmatrix']['evilRight2'], '40'],
  [Blockly.Msg['ledmatrix']['scanHorizontal1'], '41'],
  [Blockly.Msg['ledmatrix']['scanHorizontal2'], '42'],
  [Blockly.Msg['ledmatrix']['scanHorizontal3'], '43'],
  [Blockly.Msg['ledmatrix']['scanHorizontal4'], '44'],
  [Blockly.Msg['ledmatrix']['scanVertical1'], '46'],
  [Blockly.Msg['ledmatrix']['scanVertical2'], '47'],
  [Blockly.Msg['ledmatrix']['scanVertical3'], '48'],
  [Blockly.Msg['ledmatrix']['scanVertical4'], '49'],
  [Blockly.Msg['ledmatrix']['scanVertical5'], '50'],
  [Blockly.Msg['ledmatrix']['scanVertical6'], '51'],
  [Blockly.Msg['ledmatrix']['rip1'], '52'],
  [Blockly.Msg['ledmatrix']['rip2'], '53'],
  [Blockly.Msg['ledmatrix']['peering1'], '54'],
  [Blockly.Msg['ledmatrix']['peering2'], '55'],
  [Blockly.Msg['ledmatrix']['peering3'], '56'],
  [Blockly.Msg['ledmatrix']['peering4'], '57']
];

var pir_sensor_json = {
  "id": "pir_sensor",
  "message0": Blockly.Msg['socialRobotPirBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/pir.png",
      "width": 150,
      "height": 87,
      "alt": "*"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "trig",
      "check": "Number"
    }
  ],
  "output": "Number",
  "colour": 25,
  "tooltip": Blockly.Msg['sonarTooltip'],
  "helpUrl": DwenguinoHelpUrl
};

Blockly.Blocks['pir_sensor'] = {
  init: function () {
    this.jsonInit(pir_sensor_json);
  }
};

var sound_sensor_json = {
  "id": "sound_sensor",
  "message0": Blockly.Msg['socialRobotSoundSensorBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/socialrobot/sound_sensor.png",
      "width": 80,
      "height": 34,
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
  "colour": 25,
  "tooltip": "",
  "helpUrl": DwenguinoHelpUrl
};

Blockly.Blocks['sound_sensor'] = {
  init: function () {
    this.jsonInit(sound_sensor_json);
  }
};

var touch_sensor_json = {
  "id": "touch_sensor",
  "message0": Blockly.Msg['socialRobotTouchSensorBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/socialrobot/touch_sensor.png",
      "width": 50,
      "height": 50,
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
  "colour": 25,
  "tooltip": "",
  "helpUrl": DwenguinoHelpUrl
};

Blockly.Blocks['touch_sensor'] = {
  init: function () {
    this.jsonInit(touch_sensor_json);
  }
};

var button_json = {
  "id": "button_on",
  "message0": Blockly.Msg['socialRobotButtonSensorBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/socialrobot/button.svg",
      "width": 50,
      "height": 50,
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
  "colour": 25,
  "tooltip": "",
  "helpUrl": DwenguinoHelpUrl
};

Blockly.Blocks['button'] = {
  init: function () {
    this.jsonInit(button_json);
  }
};

var socialrobot_rgbled_json = {
  "id": "socialrobot_rgbled",
  "message0": Blockly.Msg['socialRobotRgbLedBlock'] + " %1 %2 " + Blockly.Msg['socialRobotPinRed'] + " %3 " + Blockly.Msg['socialRobotPinGreen'] + " %4 " + Blockly.Msg['socialRobotPinBlue'] + " %5 ",
  "args0": [
    {
      "type": "field_image",
      "src": "../../app/static/img/socialrobot/rgb_led.svg",
      "width": 30,
      "height": 30,
      "alt": "rgbled"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "pin_red",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "pin_green",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "pin_blue",
      "check": "Number"
    }
  ],
  "message1": Blockly.Msg['socialRobotRgbColorBlock'],
  "args1": [
    {
      "type": "input_value",
      "name": "color",
      "check": "Color"
    },
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 25,
  "tooltip": "",
  "helpUrl": "http://www.dwengo.org/tutorials"

};

Blockly.Blocks['socialrobot_rgbled'] = {
  init: function () {
    this.jsonInit(socialrobot_rgbled_json);
  }
};

var socialrobot_rgbled_off_json = {
  "id": "socialrobot_rgbled_off",
  "message0": Blockly.Msg['socialRobotRgbLedOffBlock'] + " " + Blockly.Msg['socialRobotPinRed'] + " %1 " + Blockly.Msg['socialRobotPinGreen'] + " %2 " + Blockly.Msg['socialRobotPinBlue'] + " %3 ",
  "args0": [
    {
      "type": "input_value",
      "name": "pin_red",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "pin_green",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "pin_blue",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 25,
  "tooltip": "",
  "helpUrl": "http://www.dwengo.org/tutorials"

};

Blockly.Blocks['socialrobot_rgbled_off'] = {
  init: function () {
    this.jsonInit(socialrobot_rgbled_off_json);
  }
};

var socialrobot_rgb_color_json = {
  "id": "socialrobot_rgb_color",
  "message0": Blockly.Msg['socialRobotRgbColor'],
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
  "output": "Color",
  "colour": 25,
  "tooltip": "",
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['socialrobot_rgb_color'] = {
  init: function () {
    this.jsonInit(socialrobot_rgb_color_json);
  }
};

var socialrobot_rgb_color_with_numbers_json = {
  "id": "socialrobot_rgb_color",
  "message0": Blockly.Msg['socialRobotRgbColor'],
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
  "colour": 25,
  "tooltip": "",
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['socialrobot_rgb_color_with_numbers'] = {
  init: function () {
    this.jsonInit(socialrobot_rgb_color_with_numbers_json);
  }
};

Blockly.Blocks['socialrobot_show_ledmatrix_image'] = {
  init: function () {
    this.setColour(25);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendDummyInput()
      .appendField(Blockly.Msg['socialRobotLedmatrixImageBlock'])
      .appendField(new Blockly.FieldDropdown(ledmatrixDropdown), "NUMBERDISPLAY");
    this.appendDummyInput().appendField("    0     1     2     3     4     5     6     7");
    this.appendDummyInput().appendField("0").appendField(new Blockly.FieldCheckbox("FALSE"), "LED00").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED10").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED20").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED30").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED40").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED50").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED60").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED70");
    this.appendDummyInput().appendField("1").appendField(new Blockly.FieldCheckbox("FALSE"), "LED01").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED11").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED21").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED31").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED41").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED51").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED61").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED71");
    this.appendDummyInput().appendField("2").appendField(new Blockly.FieldCheckbox("FALSE"), "LED02").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED12").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED22").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED32").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED42").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED52").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED62").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED72");
    this.appendDummyInput().appendField("3").appendField(new Blockly.FieldCheckbox("FALSE"), "LED03").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED13").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED23").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED33").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED43").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED53").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED63").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED73");
    this.appendDummyInput().appendField("4").appendField(new Blockly.FieldCheckbox("FALSE"), "LED04").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED14").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED24").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED34").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED44").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED54").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED64").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED74");
    this.appendDummyInput().appendField("5").appendField(new Blockly.FieldCheckbox("FALSE"), "LED05").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED15").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED25").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED35").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED45").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED55").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED65").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED75");
    this.appendDummyInput().appendField("6").appendField(new Blockly.FieldCheckbox("FALSE"), "LED06").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED16").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED26").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED36").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED46").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED56").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED66").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED76");
    this.appendDummyInput().appendField("7").appendField(new Blockly.FieldCheckbox("FALSE"), "LED07").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED17").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED27").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED37").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED47").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED57").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED67").appendField(" ").appendField(new Blockly.FieldCheckbox("FALSE"), "LED77");
    this.setTooltip(Blockly.Msg['socialRobotLedmatrixImageBlockTooltip']);
  }
};

Blockly.Blocks['socialrobot_show_ledmatrix_eye_pattern'] = {
  init: function () {
    this.setColour(25);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendDummyInput()
      .appendField(Blockly.Msg['socialRobotLedmatrixEyePatternBlock'])
      .appendField(new Blockly.FieldDropdown(eyePatternDropdown), "EYEPATTERN");
    this.appendDummyInput()
      .appendField(Blockly.Msg['socialRobotLedmatrixEyePatternSegmentBlock'])
      .appendField(new Blockly.FieldDropdown(ledmatrixDropdown), "NUMBERDISPLAY");
    this.setTooltip(Blockly.Msg['socialRobotLedmatrixEyePatternBlockTooltip']);
  }
}

Blockly.Blocks['socialrobot_clear_ledmatrix_segment'] = {
  init: function () {
    this.setColour(25);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendDummyInput()
      .appendField(Blockly.Msg['socialRobotLedmatrixClearSegmentBlock'])
      .appendField(new Blockly.FieldDropdown(ledmatrixDropdown), "NUMBERDISPLAY");
    this.setTooltip(Blockly.Msg['socialRobotLedmatrixClearSegmentBlockTooltip']);
  }
}

Blockly.Blocks['socialrobot_clear_ledmatrix'] = {
  init: function () {
    this.setColour(25);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendDummyInput()
      .appendField(Blockly.Msg['socialRobotLedmatrixClearDisplayBlock'])
    this.setTooltip(Blockly.Msg['socialRobotLedmatrixClearDisplayBlockTooltip']);
  }
}

// Blockly.Blocks['socialrobot_play_animation'] = {
//   init: function() {
//     this.setColour(25);
//     this.setPreviousStatement(true);
//     this.setNextStatement(true);
//     this.appendDummyInput()
//           .appendField(DwenguinoBlocklyLanguageSettings.translate(['socialRobotLedmatrixDisplayAnimationBlock)
//           .appendField(new Blockly.FieldDropdown(animationDropdown), "ANIMATION");
//     this.appendDummyInput()
//           .appendField(DwenguinoBlocklyLanguageSettings.translate(['socialRobotLedmatrixLeftSegmentBlock)
//           .appendField(new Blockly.FieldDropdown(ledmatrixDropdown), "NUMBERDISPLAY");
//     this.appendDummyInput().appendField(DwenguinoBlocklyLanguageSettings.translate(['socialRobotLedmatrixRightSegmentBlock)
//           .appendField(new Blockly.FieldDropdown(ledmatrixDropdown), "NUMBERDISPLAY");

//     this.setTooltip(DwenguinoBlocklyLanguageSettings.translate(['socialRobotLedmatrixClearDisplayBlockTooltip);
//   }
// }

var socialrobot_servo_json = {
  "id": "socialrobot_servo",
  "message0": Blockly.Msg['socialrobotServoBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/servo.png",
      "width": 100,
      "height": 100,
      "alt": "*"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "pin",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "angle",
      "check": "Number"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 25,
  "tooltip": "Put arms down",
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['socialrobot_servo'] = {
  init: function () {
    this.jsonInit(socialrobot_servo_json);
  }
};

var socialrobot_arms_down_json = {
  "id": "socialrobot_arms_down",
  "message0": Blockly.Msg['socialRobotArmsDownBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/socialrobot/arms_down.png",
      "width": 177,
      "height": 147,
      "alt": "*"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "servo_right_hand1",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "servo_left_hand1",
      "check": "Number",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 25,
  "tooltip": "Put arms down",
  "helpUrl": "http://www.dwengo.org/tutorials"
};


Blockly.Blocks['socialrobot_arms_down'] = {
  init: function () {
    this.jsonInit(socialrobot_arms_down_json);
  }
};

var socialrobot_arms_up_json = {
  "id": "socialrobot_arms_up",
  "message0": Blockly.Msg['socialRobotArmsUpBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/socialrobot/arms_up.png",
      "width": 177,
      "height": 147,
      "alt": "*"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "servo_right_hand2",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "servo_left_hand2",
      "check": "Number",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 25,
  "tooltip": "Put arms up",
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['socialrobot_arms_up'] = {
  init: function () {
    this.jsonInit(socialrobot_arms_up_json);
  }
};

var socialrobot_wave_arms_json = {
  "id": "socialrobot_wave_arms",
  "message0": Blockly.Msg['socialrobotWaveArmesBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "servo_right_hand",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "servo_left_hand",
      "check": "Number",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 25,
  "tooltip": "Wave arms",
  "helpUrl": "http://www.dwengo.org/tutorials"
};


Blockly.Blocks['socialrobot_wave_arms'] = {
  init: function () {
    this.jsonInit(socialrobot_wave_arms_json);
  }
};

var socialrobot_eyes_left_json = {
  "id": "socialrobot_eyes_left",
  "message0": Blockly.Msg['socialRobotEyesLeftBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/socialrobot/turn_eyes_left.png",
      "width": 150,
      "height": 65,
      "alt": "*"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "servo_right_eye",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "servo_left_eye",
      "check": "Number",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 25,
  "tooltip": "Turn eyes left",
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['socialrobot_eyes_left'] = {
  init: function () {
    this.jsonInit(socialrobot_eyes_left_json);
  }
};

var socialrobot_eyes_right_json = {
  "id": "socialrobot_eyes_right",
  "message0": Blockly.Msg['socialRobotEyesRightBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_image",
      "src": "../../app/static/img/socialrobot/turn_eyes_right.png",
      "width": 150,
      "height": 65,
      "alt": "*"
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "servo_right_eye1",
      "check": "Number",
      "align": "RIGHT"
    },
    {
      "type": "field_label_serializable",
      "name": "NAME",
      "text": ""
    },
    {
      "type": "input_value",
      "name": "servo_left_eye1",
      "check": "Number",
      "align": "RIGHT"
    }
  ],
  "previousStatement": null,
  "nextStatement": null,
  "colour": 25,
  "tooltip": "Turn eyes right",
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['socialrobot_eyes_right'] = {
  init: function () {
    this.jsonInit(socialrobot_eyes_right_json);
  }
};

var socialrobot_set_pin = {
  "id": "socialrobot_set_pin",
  "message0": Blockly.Msg['socialrobotSetPinState'],
  "args0": [
    {
      "type": "input_value",
      "name": "PIN",
      "check": "Number"
    },
    {
      "type": "input_value",
      "name": "PIN_STATE",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "colour": 25,
  "tooltip": "Set pin",
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['socialrobot_set_pin'] = {
  init: function () {
    this.jsonInit(socialrobot_set_pin);
  }
};

var socialrobot_read_pin_json = {
  "id": "socialrobot_read_pin",
  "message0": Blockly.Msg['socialrobotReadPinBlock'],
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "input_value",
      "name": "PIN",
      "check": "Number"
    }
  ],
  "output": "Number",
  "colour": 25,
  "tooltip": "Read pin",
  "helpUrl": "http://www.dwengo.org/tutorials"
};

Blockly.Blocks['socialrobot_read_pin'] = {
  init: function () {
    this.jsonInit(socialrobot_read_pin_json);
  }
};
