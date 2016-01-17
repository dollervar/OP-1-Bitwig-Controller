// Bitwig Controller-Script for using TE Operator-1

loadAPI(6);
load("consts.js")
load("extensions.js")
load("buttonhandle.js")
load("displayfunctions.js")

host.defineController(
		"teenage-engineering",
		"OP-1",
		"0.1",
		"B208085B-FEF8-44DA-BF71-B951A74B41DB",
		"S. M. Alois Krenn");

host.defineMidiPorts(1, 1);
host.addDeviceNameBasedDiscoveryPair(["OP-1 Midi Device"], ["OP-1 Midi Device"]);
host.defineSysexIdentityReply(OP1_SYSEX_ID)

var mode = "";
var current_map = "";

function init() {
	// Set MIDI IO
	midiIn = host.getMidiInPort(0);
	midiOut = host.getMidiOutPort(0);
	// Set callbacks on recieve on MIDI events
	midiIn.setMidiCallback(onMidi);
	midiIn.setSysexCallback(onSysex);
	// Create MIDI note inputs
//	noteIn = midiIn.createNoteInput("Notes");
//	noteIn.setShouldConsumeEvents(false);
	
	// Send SysEx ID Request to OP-1
	midiOut.sendSysex(ID_REQUEST)

	// Initialize OP-1 Ableton Controller mode
	initControllerMode();

	// Create main Bitwig Objects
	application = host.createApplication();
	arranger = host.createArranger();
	mixer = host.createMixer();
    transport = host.createTransport();
	trackBank = host.createTrackBank(13,0,0);
	masterTrack = host.createMasterTrack(0);
	curserTrack = host.createArrangerCursorTrack(2, 0);
	trackBank.followCursorTrack(curserTrack)
	aClipCursor = host.createArrangerCursorClip(0,0)

	/* Observers */
	// Update Track / Channel information to OP-1
	// Now only out to console
	for (var track=0; track<NUM_TRACKS; track++) {
		trackBank.getChannel(track).getArm().addValueObserver(
				makeIndexedFunction(track, function(track, state) {
					println("Track " + track + " Arm: " + state)
				}));
		trackBank.getChannel(track).addNameObserver(
				8, "", makeIndexedFunction(track, function(track, name) {
					println("Track " + track + " name: " + name);
				}));
	};

	transport.addIsPlayingObserver(function(isPlaying) {
	   host.showPopupNotification(isPlaying ? "PLAY" : "STOP");
	});
	transport.getPosition().addTimeObserver(":", 4, 1, 1, 2, function(time) {
		//writeDisplay(time);
		println(time);
	});
	transport.getInPosition().markInterested();
	transport.tempo().value().displayedValue().markInterested();
	application.addPanelLayoutObserver(function(lo) {
		println(lo.toLowerCase())		
		switchMode(lo.toLowerCase())
	},9);
	aClipCursor.getLoopLength().markInterested();
	aClipCursor.playingStep().markInterested();
};

function onMidi(status, data1, data2) {
	printMidi(status, data1, data2);
	var pressed = data2 > 64; // ignore release 
	if (isChannelController(status)) {
		println(!!onMidi.isShift)
		println('pressed: ' + !!onMidi.pressed)
		handleButtonPress({
			'cc': data1, 
			'value': data2, 
			'isShift': !!onMidi.isShift, // Returns true for data > 64 (pressed) 
			'pressed': pressed,
			'metaFn': !!onMidi.metaFn,
		});	
	};

	if (isNoteOn(status)) {
		if(this.mode == OP1_MODES.MIX || this.mode == OP1_MODES.ARRANGE) {
			curserTrack.selectChannel(trackBank.getChannel(MIDI_NOTES.indexOf(data1)));
		};
	};
};

function onSysex(data) {
	println('Input');
	printSysex(data);
};

function exit() {
	midiOut.sendSysex(DEACTIVATE_SEQ);
	println("exit.");
};
