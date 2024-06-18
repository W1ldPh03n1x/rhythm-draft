import { DrumPattern } from "src/entities/Pattern/model/types";
import { DRUM_KIT, DRUM_TYPES_IN_ORDER, SIGNATURE_TO_TICKS } from "src/shared/lib/consts";
import { DrumName, DrumType, TimeSignature } from "src/shared/lib/types";
import { DrumTracks } from "../model/types";
import p5 from "p5";
import { store } from "src/shared/lib/store";

export const makeEmptyDrumTracks = () => {
	return Object.fromEntries(
		DRUM_TYPES_IN_ORDER.map((drumType) => {
			// console.log(drumType);
			return [drumType, Array<number>()];
		}),
	) as DrumTracks;
};

export const convertPatternToTracks = (pattern: DrumPattern) => {
	let tracks = makeEmptyDrumTracks();

	for (let tick = 0; tick < pattern.tickTrack.length; tick++) {
		if (pattern.tickTrack[tick].size !== 0) {
			Array.from(pattern.tickTrack[tick]).map((drumType) => tracks[drumType].push(tick));
		}
	}
	return tracks;
};

export const drawBeatIcon = (p: p5, position: number, type: "normal" | "binding" = "normal") => {
	let alpha = type === "normal" ? 255 : 31;
	let store = type === "normal" ? 127 : 207;
	p.push();
	p.angleMode(p.DEGREES);
	p.rectMode(p.CENTER);

	p.translate(position, p.height / 2);
	p.rotate(45);

	p.stroke(store);
	p.strokeWeight(2);
	p.fill(240, alpha);

	p.square(0, 0, 16, 2);
	p.pop();
};
export const drawBeats = (p: p5, beats: number[], signature: TimeSignature = "4/4") => {
	const pixelsInTick = (p.width - 20) / SIGNATURE_TO_TICKS[signature];
	// console.log(signature);
	for (let i = 0; i < beats.length; i++) {
		drawBeatIcon(p, beats[i] * pixelsInTick + 20);
	}
};
