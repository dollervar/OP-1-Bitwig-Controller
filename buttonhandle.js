// 
// Functions for handle button mapping and actions 
// 

function handleButtonPress(event) {
	var button = CC[event.cc];
	if (!event.pressed) {
		if (ON_RELEASE_MAP[button]) {
			ON_RELEASE_MAP[button](event);
		};
	} else if (current_map[button]) {
		current_map[button](event);
	} else if (GLOBAL_MAP[button]) {
		GLOBAL_MAP[button](event);
	};
}

function getEncoderIncrement(value) {
  return value < 64 ? 1 : -1;
}

var ON_RELEASE_MAP = {
	SHIFT_BUTTON: function(event) {
		GLOBAL_MAP.SHIFT_BUTTON(event)
	},
	ENCODER_ORANGE: function(event) {
		current_map.ENCODER_ORANGE(event)
	},
	ENCODER_WHITE: function(event) {
		current_map.ENCODER_WHITE(event)
	},
	ENCODER_GREEN: function(event) {
		current_map.ENCODER_GREEN(event)
	},
	ENCODER_BLUE: function(event) {
		current_map.ENCODER_BLUE(event)
	},
};

var GLOBAL_MAP = {
	SHIFT_BUTTON: function(event) {
		onMidi.isShift = event.pressed
	},
	PLAY_BUTTON: function(event) {
		event.isShift ? transport.restart() : transport.play()
	},
	STOP_BUTTON: function() {
		transport.stop()
	},
	REC_BUTTON: function(event) {
		event.isShift ? curserTrack.getArm().toggle() : transport.record()
	},
	LEFT_ARROW: function(event) {
		event.isShift ? transport.rewind() : application.arrowKeyLeft();
	},
	RIGHT_ARROW: function(event) {
		event.isShift ?	transport.fastForward() : application.arrowKeyRight();
	},
	COM: function(event) {
		event.isShift ? sendSysex(DEACTIVATE_SEQ) : false
	},
	MODE_1_BUTTON: function(event) {
		event.isShift ? application.toggleDevices() : switchMode(OP1_MODES.EDIT) 
	},
	MODE_2_BUTTON: function() {
		switchMode(OP1_MODES.LAUNCHE)
	},
	MODE_3_BUTTON: function() {
		switchMode(OP1_MODES.ARRANGE)
	},
	MODE_4_BUTTON: function(event) {
		event.isShift ? application.toggleMixer() : switchMode(OP1_MODES.MIX)
	},
	METRONOME_BUTTON: function(event) {
		event.isShift ? transport.tabTempo() : transport.toggleClick()
	},
	HELP_BUTTON: function() {
		application.toggleInspector()	
	},
	SS1_BUTTON: function() {
		transport.togglePunchIn()
	},
	SS2_BUTTON: function() {
		transport.togglePunchOut()
	},
	SS3_BUTTON: function() {
		transport.toggleLoop()
	},
	SS4_BUTTON: function() {
		transport.toggleOverdub()
	},
	SS7_BUTTON: function() {
		curserTrack.getSolo().toggle()
	},
	SS8_BUTTON: function() {
		curserTrack.getMute().toggle()
	}
};

var MIX_MAP = {
	LEFT_ARROW: function() {
		curserTrack.selectPrevious()
	},
	RIGHT_ARROW: function() {
		curserTrack.selectNext()
	},
	MICRO: function() {
		curserTrack.getMonitor().toggle()
	},
	ENCODER_ORANGE: function(event) { 
		curserTrack.getVolume().inc(getEncoderIncrement(event.value), 256)
	},
	ENCODER_WHITE: function(event) { 
		curserTrack.getPan().inc(getEncoderIncrement(event.value), 256)
	},
	ENCODER_GREEN: function(event) { 
		curserTrack.getSend(1).inc(getEncoderIncrement(event.value, 256))
	},

};

var ARRANGE_MAP = {
	SCISSOR_BUTTON: function() {
	},
	ENCODER_BLUE: function(event) {
		if (!event.isShift) {
			transport.incPosition(getEncoderIncrement(event.value),false)
		} else {
			if (getEncoderIncrement(event.value) == 1) {
				application.zoomIn();
			} else if (getEncoderIncrement(event.value) == -1) {
				application.zoomOut();
			}
		}
	}
};

var LAUNCH_MAP = {

};

var EDIT_MAP = {
};
