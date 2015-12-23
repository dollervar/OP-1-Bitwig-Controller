function switchMode(mode) {
	if(this.mode != mode) {
		this.mode = mode;
		writeDisplay(mode)	
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
			case OP1_MODES.LAUNCH:
				current_map = LAUNCH_MAP
				if (mode == OP1_MODES.ARRANGE) {
					arranger.isClipLauncherVisible().toggle();
				} else if (mode == OP1_MODES.MIX) {
					mixer.isClipLauncherSectionVisible().toggle();
				};
		};
	};
};

function trackSelect(index) {
	curserTrack.selectChannel(trackBank.getChannel(index));
}
