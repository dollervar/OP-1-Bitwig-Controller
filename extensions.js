function switchMode(mode) {
	if(this.mode != mode) {
		writeDisplay(mode)	
		this.mode = mode;
		switch(mode) {
			case OP1_MODES.ARRANGE:
				current_map = ARRANGE_MAP
				application.setPanelLayout("ARRANGE")
				println(transport.getTempo());
				println(transport.getPosition());
				println(transport.getTimeSignature().getTicks());
				break;
			case OP1_MODES.MIX:
				current_map = MIX_MAP
				application.setPanelLayout("MIX")
				break;
			case OP1_MODES.EDIT:
				current_map = EDIT_MAP
				application.setPanelLayout("EDIT")
		};
	};
};


function trackSelector(data1) {
	trackChannel = "";
	switch(data1) {
		case 53:
			printMidi(data1);
			trackChannel = curserTrack.selectChannel(trackBank.getChannel(0));
			break;
		case 55:
			curserTrack.selectChannel(trackBank.getChannel(1));
			break;
	};
}
