// consts.js

// Number of modes
var OP1_MODES ={
	ARRANGER: "arranger",
	LAUNCHER: "launcher",
	TRANSPORT: "transport",
	MIXER: "mixer",
};

// OP-1 keymapping
var CC = {
    ENCODER_BLUE: 1,
    ENCODER_GREEN: 2,
    ENCODER_WHITE: 3,
    ENCODER_ORANGE: 4,
    ENCODER_BLUE_PRESS: 64,
    ENCODER_GREEN_PRESS: 65,
    ENCODER_WHITE_PRESS: 66,
    ENCODER_ORANGE_PRESS: 67,
    HELP_BUTTON: 5,
    METRONOME_BUTTON: 6,
    MODE_1_BUTTON: 7,
    MODE_2_BUTTON: 8,
    MODE_3_BUTTON: 9,
    MODE_4_BUTTON: 10,
    T1_BUTTON: 11,
    T2_BUTTON: 12,
    T3_BUTTON: 13,
    T4_BUTTON: 14,
    ARROW_UP_BUTTON: 15,
    ARROW_DOWN_BUTTON: 16,
    SCISSOR_BUTTON: 17,
    SS1_BUTTON: 50,
    SS2_BUTTON: 51,
    SS3_BUTTON: 52,
    SS4_BUTTON: 21,
    SS5_BUTTON: 22,
    SS6_BUTTON: 23,
    SS7_BUTTON: 24,
    SS8_BUTTON: 25,
    REC_BUTTON: 38,
    PLAY_BUTTON: 39,
    STOP_BUTTON: 40,
    LEFT_ARROW: 41,
    RIGHT_ARROW: 42,
    SHIFT_BUTTON: 43,
    MICRO: 48,
    COM: 49,
};


// SysEx Messages
var ACTIVATE_SEQ = "f0 00 20 76 00 01 02 f7"
var DEACTIVATE_SEQ = "f0 00 20 76 00 01 00 f7"
var BEGIN_SEQ = "f0 00 20 76 00 03"
var END_SEQ = "F7"
var COLOUR_SEQ = "f0 00 20 76 00 04"
var ID_REQUEST = "F0 7E 7F 06 01 F7"
var OP1_SYSEX_ID = "f0 7e 00 06 02 00 20 76 00 00 00 00 00 00 00 00 f7"


// ASCII Control caracters in Hex
var CTRL_CHAR = { 
	NULL:"00",
	EOT:"04",
	BS:"08",
	LF:"0A",
	NP:"0C",
	CR:"0D",
	DLE:"10",
	DC1:"11",
	DC2:"12",
	DC3:"13",
	DC4:"14",
}
