import { useAudioAbc } from "../../../../shared/lib/hooks/useAudioAbc";
import { AbcDrumBar } from "@shared/lib/utils/abcDrumStrings";
import React from "react";

const Audio = ({ bar }: { bar: AbcDrumBar }) => {
	const { displayElement } = useAudioAbc(bar.getAbcString());
	return (
		<div>
			<div className="BarAudio" ref={displayElement}></div>
		</div>
	);
};

export default Audio;
