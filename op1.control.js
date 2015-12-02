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
	
	// Send SysEx ID Request
	midiOut.sendSysex(ID_REQUEST)

	// Initialize OP-1 Controller mode
	initControllerMode();

	// Create main Bitwig Objects
	application = host.createApplication();
	arranger = host.createArranger();
	mixer = host.createMixer();
    transport = host.createTransport();
	

	/* Observers */
	transport.addIsPlayingObserver(function(isPlaying) {
	   host.showPopupNotification(isPlaying ? "PLAY" : "STOP");
	});
}


function onMidi(status, data1, data2) {
	printMidi(status, data1, data2);
	var pressed = data2 > 64; // ignored release 

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
