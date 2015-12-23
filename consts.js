// consts.js

// Number of tracks/channels that can be accesd throught the Note keys
const NUM_TRACKS = 13;

// Number of modes
const OP1_MODES ={
	"ARRANGE": "arrange",
	"MIX": "mix",
	"EDIT": "edit",
	"LAUNCHE": "launch"
};

const BITWIG_PANELS = ['editor', 'automation', 'devices', 'mixer', 'inspector', 'browser',];

const NOTES = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76];

// OP-1 button -> cc mapping
const CC = {
	1: 'ENCODER_BLUE',
    2: 'ENCODER_GREEN',
    3: 'ENCODER_WHITE',
    4: 'ENCODER_ORANGE',
    5: 'HELP_BUTTON',
    6: 'METRONOME_BUTTON',
    7: 'MODE_1_BUTTON',
    8: 'MODE_2_BUTTON',
    9: 'MODE_3_BUTTON',
    10: 'MODE_4_BUTTON',
    11: 'T1_BUTTON',
    12: 'T2_BUTTON',
    13: 'T3_BUTTON',
    14: 'T4_BUTTON',
    15: 'ARROW_UP_BUTTON',
    16: 'ARROW_DOWN_BUTTON',
    17: 'SCISSOR_BUTTON',
    50: 'SS1_BUTTON',
    51: 'SS2_BUTTON',
    52: 'SS3_BUTTON',
    21: 'SS4_BUTTON',
    22: 'SS5_BUTTON',
    23: 'SS6_BUTTON',
    24: 'SS7_BUTTON',
    25: 'SS8_BUTTON',
	26: 'SEQ_BUTTON',
    38: 'REC_BUTTON',
    39: 'PLAY_BUTTON',
    40: 'STOP_BUTTON',
    41: 'LEFT_ARROW',
    42: 'RIGHT_ARROW',
    43: 'SHIFT_BUTTON',
    48: 'MICRO',
    49: 'COM',
	53: 'ENCODER_BLUE_U01',
	54: 'ENCODER_GREEN_U01',
	55: 'ENCODER_WHITE_U01',
	56: 'ENCODER_ORANGE_U01',
	57: 'ENCODER_BLUE_U02',
	58: 'ENCODER_GREEN_U02',
	59: 'ENCODER_WHITE_U02',
	60: 'ENCODER_ORANGE_U02',
	61: 'ENCODER_BLUE_U03',
	62: 'ENCODER_GREEN_U03',
	63: 'ENCODER_WHITE_U03',
	64: 'ENCODER_ORANGE_U03',
    64: 'ENCODER_BLUE_PRESS',
    65: 'ENCODER_GREEN_PRESS',
    66: 'ENCODER_WHITE_PRESS',
    67: 'ENCODER_ORANGE_PRESS',
};

// SysEx Messages
const ACTIVATE_SEQ = "f0 00 20 76 00 01 02 f7"
const DEACTIVATE_SEQ = "f0 00 20 76 00 01 00 f7"
const BEGIN_SEQ = "f0 00 20 76 00 03"
const END_SEQ = "F7"
const COLOUR_SEQ = "f0 00 20 76 00 04"
const ID_REQUEST = "F0 7E 7F 06 01 F7"
const OP1_SYSEX_ID = "f0 7e 00 06 02 00 20 76 00 00 00 00 00 00 00 00 f7"

// ASCII Control caracters in Hex
const CTRL_CHAR = { 
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
};
