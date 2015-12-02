// Bitwig Controller-Script for using TE Operator-1

loadAPI(1);
load("consts.js")
load("extensions.js")

host.defineController("teenage-engineering", "OP-1", "0.1", "B208085B-FEF8-44DA-BF71-B951A74B41DB", "S. M. Alois Krenn");
host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["OP-1 Midi Device"], ["OP-1 Midi Device"]);
host.defineSysexIdentityReply(OP1_SYSEX_ID)


var isShift = false;
var mode = "NIL";

function init() {
	midiIn = host.getMidiInPort(0);
	midiOut = host.getMidiOutPort(0);

	midiIn.setMidiCallback(onMidi);
	midiIn.setSysexCallback(onSysex);

	noteIn = midiIn.createNoteInput("Notes");
	noteIn.setShouldConsumeEvents(false);
	
	// Enable Ableton MIDI mode
	// Send SysEx ID Request
	midiOut.sendSysex(ID_REQUEST)
	initDisplay();

	application = host.createApplication();
	arranger = host.createArranger();
	mixer = host.createMixer();
    transport = host.createTransport();
	notification = host.getNotificationSettings();
	
	println(transport.getPosition());

	// Observers
	transport.addIsPlayingObserver(function(isPlaying) {
	   println(isPlaying ? "PLAY" : "STOP");
	   host.showPopupNotification(isPlaying ? "PLAY" : "STOP");
	});
}


function handleButtonPress(data1, isShift) {
	switch(data1) {
		case CC.PLAY_BUTTON:
			isShift ? transport.restart() : transport.play();
			break;
		case CC.STOP_BUTTON:
			transport.stop();
			break;
		case CC.REC_BUTTON:
			transport.record();
			break;
		case CC.LEFT_ARROW:
			transport.rewind();
			break;
		case CC.RIGHT_ARROW:
			transport.fastForward();
			break;
		case CC.METRONOME_BUTTON:
			isShift ? transport.tapTempo() : transport.toggleClick();
			break;
		case CC.SS1_BUTTON:
			transport.togglePunchIn();
			break;
		case CC.SS2_BUTTON:
			transport.togglePunchOut();
			break;
		case CC.SS3_BUTTON:
			transport.toggleLoop();
			break;
		case CC.SS4_BUTTON:
			transport.toggleOverdup();
			break;
		case CC.COM:
			sendSysex(DEACTIVATE_SEQ); 
			break;
		case CC.MODE_1_BUTTON:
			setMode(OP1_MODES.ARRANGER)
			break;
		case CC.MODE_2_BUTTON:
			setMode(OP1_MODES.LAUNCHER)
			break;
		case CC.MODE_3_BUTTON:
			setMode(OP1_MODES.TRANSPORT)
			break;
		case CC.MODE_4_BUTTON:
			setMode(OP1_MODES.MIXER)
			break;
			/*CC.ENCODER_BLUE
   			CC.ENCODER_GREEN
   			CC.ENCODER_WHITE
   			CC.ENCODER_ORANGE
   			CC.ENCODER_BLUE_PRESS
   			CC.ENCODER_GREEN_PRESS
   			CC.ENCODER_WHITE_PRESS
   			CC.ENCODER_ORANGE_PRESS
   			CC.HELP_BUTTON
   			CC.METRONOME_BUTTON
			CC.MODE_1_BUTTON
			CC.MODE_2_BUTTON
			CC.MODE_3_BUTTON
			CC.MODE_4_BUTTON
			CC.T1_BUTTON
			CC.T2_BUTTON
			CC.T3_BUTTON
			CC.T4_BUTTON
			CC.ARROW_UP_BUTTON
			CC.ARROW_DOWN_BUTTON
			CC.SCISSOR_BUTTON
			CC.SS1_BUTTON
			CC.SS2_BUTTON
			CC.SS3_BUTTON
			CC.SS4_BUTTON
			CC.SS5_BUTTON
			CC.SS6_BUTTON
			CC.SS7_BUTTON
			CC.SS8_BUTTON
			CC.REC_BUTTON
			CC.PLAY_BUTTON
			CC.STOP_BUTTON
			CC.LEFT_ARROW
			CC.RIGHT_ARROW
			CC.SHIFT_BUTTON
			CC.MICRO*/
	};
}

// @param: OP1_MODES Object
function setMode(mode) {
	if(this.mode != mode) {
		writeDisplay(mode)	
		this.mode = mode;
		if (mode == OP1_MODES.MIXER) {
			application.toggleMixer();	
		};
		switch(mode) {
			case OP1_MODES.ARRANGER:
				break;
			case OP1_MODES.LAUNCHER:
				break;
			case OP1_MODES.TRANSPORT:
				break;
			case OP1_MODES.MIXER:
				break;
		};
	};
};

function writeDisplay(text) {
	var seq = BEGIN_SEQ + CTRL_CHAR.NP + text.toHex(text.length) + CTRL_CHAR.NULL + END_SEQ
	midiOut.sendSysex(seq);
	midiOut.sendSysex(COLOUR_SEQ + "00 00 00 00 00 00 00 00 00 00 00 00 00" + END_SEQ);
	printSysex(seq)
}

function initDisplay() {
	// Flush text
	midiOut.sendSysex(BEGIN_SEQ + "00" + END_SEQ);
	// Reset colours?
	midiOut.sendSysex("F0 00 20 76 00 04 0D 00 00 00 00 00 00 00 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  00 00 00 00 00 00 F7");
	// Not shure what happens but seems it has someting to with colours
	midiOut.sendSysex(COLOUR_SEQ + "04 00 00 00 00 00 00 00 00 00 00 00 00" + END_SEQ);
	// Send Sequence to activate Ableton mode on the op-1
	midiOut.sendSysex(ACTIVATE_SEQ);
}

function handleButtonHold(data1, pressed) {
		if (data1 == CC.SHIFT_BUTTON) {
				isShift = pressed;
		};
}

function onMidi(status, data1, data2) {
	printMidi(status, data1, data2);
	var pressed = data2 > 64; // ignore button release

	if (isChannelController(status)) { 
		handleButtonHold(data1, pressed);

		if (pressed) {
			handleButtonPress(data1, isShift);
		};
	};
}

function onSysex(data) {
	println('Input');
	printSysex(data);
}

function exit() {
	midiOut.sendSysex(DEACTIVATE_SEQ);
	println("exit.");
}
