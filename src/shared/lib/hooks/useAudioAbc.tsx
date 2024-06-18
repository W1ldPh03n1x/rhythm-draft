import React, { useEffect, useRef, useState } from "react";
import {
	CursorControl,
	synth as Synth,
	SynthOptions,
	SynthVisualOptions,
	TuneObject,
	renderAbc,
} from "abcjs";

export const useAudioAbc = (
	source: string | TuneObject,
	synthVisualOptions: SynthVisualOptions = {
		displayLoop: true,
		displayRestart: true,
		displayPlay: true,
		displayProgress: true,
		displayWarp: true,
	},
	audioParams: SynthOptions = { chordsOff: true, qpm: 100 },
) => {
	let cursorControl: CursorControl = {}; // see section on CursorControl

	const [sourceData, setSourceData] = useState(source);
	const displayElement = useRef(null);

	useEffect(() => {
		if (Synth.supportsAudio()) {
			let synthControl = new Synth.SynthController();
			let synth = new Synth.CreateSynth();
			let visualObj = typeof source === "string" ? renderAbc("*", source)[0] : source;
			let myContext = new AudioContext();
			let millisecondsPerMeasure = 10000;

			synthControl.load(displayElement.current!, cursorControl, synthVisualOptions);

			synth
				.init({ audioContext: myContext, visualObj: visualObj, millisecondsPerMeasure })
				.then(() =>
					synthControl
						// @ts-ignore
						.setTune(visualObj, true, audioParams)
						.then(() => {
							console.log("Audio successfully loaded.");
						})
						.catch((error) => {
							console.warn("Audio problem:", error);
						}),
				)
				.catch((error) => {
					console.warn("Audio problem:", error);
				});
		} else {
			console.error("Audio not supported");
		}
	}, [sourceData]);

	useEffect(() => {
		setSourceData(source);
	}, [source]);

	return { displayElement };
};
