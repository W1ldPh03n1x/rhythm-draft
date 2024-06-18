import { useEffect, useRef, useState } from "react";
import {
	AbcVisualParams,
	SynthOptions,
	SynthVisualOptions,
	TuneObject,
	renderAbc,
	synth as Synth,
	CursorControl,
	TuneObjectArray,
} from "abcjs";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { selectAudioContext } from "../store/selectors";
import { createAudioContext } from "../store/audioContextSlice";

export interface useAbcRendererParams {
	withSound?: boolean;
	withVisual?: boolean;
	visualParams?: AbcVisualParams;
	synthVisualOptions?: SynthVisualOptions;
	audioParams?: SynthOptions;
}

export const useAbcRender = (abcString: string, params?: useAbcRendererParams) => {
	let {
		visualParams,
		synthVisualOptions,
		audioParams,
		withSound,
		withVisual,
	}: useAbcRendererParams = params || {};
	if (!visualParams) {
		visualParams = {
			staffwidth: 320,
			paddingtop: -4,
			paddingbottom: 2,
			paddingright: 8,
			paddingleft: 8,
			add_classes: true,
			responsive: "resize",
		};
	}
	if (!synthVisualOptions)
		synthVisualOptions = {
			displayLoop: true,
			displayRestart: true,
			displayPlay: true,
			displayProgress: true,
			displayWarp: true,
		};
	if (!audioParams) audioParams = { chordsOff: true, qpm: 100 };
	if (withSound === undefined) withSound = false;
	if (withVisual === undefined) withVisual = true;

	const visualRef = useRef(null);
	const soundRef = useRef(null);
	let cursorControl: CursorControl = {}; // see section on CursorControl

	const [sourceData, setSourceData] = useState<TuneObject[]>([]);

	const dispatch = useAppDispatch();

	const audioContext = useAppSelector(selectAudioContext);

	if (!audioContext && withSound) dispatch(createAudioContext());

	// render abc on start
	useEffect(() => {
		setSourceData(renderAbc(visualRef.current!, abcString, visualParams));
	}, [abcString]);

	//
	useEffect(() => {
		if (!withSound) return;
		if (Synth.supportsAudio() && soundRef.current && withSound && audioContext) {
			let synthControl = new Synth.SynthController();
			let synth = new Synth.CreateSynth();
			// let myContext = new AudioContext(); // Here can be used external audio context
			// let millisecondsPerMeasure = 10000;

			synthControl.load(soundRef.current, cursorControl, synthVisualOptions);

			if (sourceData.length > 0)
				synth
					.init({ audioContext, visualObj: sourceData[0] })
					.then(() =>
						synthControl
							.setTune(sourceData[0], true, audioParams)
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
	}, [sourceData, audioContext]);

	return {
		visualRendererRef: visualRef,
		soundRendererRef: soundRef,
	};
};
