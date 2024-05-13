import { AbcDrumBar } from "@shared/lib/utils/abcDrumStrings";
import useAudioAbc from "../../../../shared/lib/hooks/useAudioAbc";
import React from "react";

const OneBarAudio = ({ bar }: { bar: AbcDrumBar }) => {
	const displayElement = useAudioAbc(bar.getAbcString({ tempo: 100 }));
	return (
		<div>
			<div className="abc-audio" ref={displayElement}></div>
		</div>
	);
};

export default OneBarAudio;
