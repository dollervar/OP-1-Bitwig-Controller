function writeDisplay(str) {
	var seq = BEGIN_SEQ + CTRL_CHAR.NP + str.toHex(str.length) + CTRL_CHAR.NULL + END_SEQ
	println(str)
	midiOut.sendSysex(seq);
	midiOut.sendSysex(COLOUR_SEQ + "00 00 00 00 00 00 00 00 00 00 00 00 00" + END_SEQ);
	printSysex(seq)
}
function setColour(str) { 
	midiOut.sendSysex(COLOUR_SEQ + "04" + str.toHex + END_SEQ);
	printSysex(seq)
}

function initControllerMode() {
	// Flush text
	midiOut.sendSysex(BEGIN_SEQ + "00" + END_SEQ);

	// Reset colours
	midiOut.sendSysex(COLOUR_SEQ + "0D 00 00 00 00 00 00 00 10 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00  00 00 00 00 00 00" + END_SEQ);
	midiOut.sendSysex(COLOUR_SEQ + "04 00 00 00 00 00 00 00 00 00 00 00 00" + END_SEQ);

	// Send Sequence to activate Ableton mode on the op-1
	midiOut.sendSysex(ACTIVATE_SEQ);
	writeDisplay("bitwig\rcontroller mode")
}
