import { NoteLength, TimeSignature } from "../types";
import { DRUM_ALIAS_STRING, DRUM_MAPPING_STRING, ROOT_BEAT_LENGTH } from "../consts";

export const makeDrumAbcHeader = (
	signature: TimeSignature,
	baseLength: NoteLength = ROOT_BEAT_LENGTH,
	tempo?: number,
) => {
	return (
		DRUM_MAPPING_STRING +
		DRUM_ALIAS_STRING +
		(tempo ? `Q: ${tempo}\n` : "") +
		`L: ${baseLength}\nK: perc\nM:${signature || ""}\nV:1 up\n`
	);
};

// export class AbcDrumBar {
// 	abcNotes: string;
// 	baseLength: NoteLength;
// 	signature: TimeSignature;

// 	constructor(
// 		abcNotes: string,
// 		baseLength: NoteLength = "1/8",
// 		signature: TimeSignature = "4/4",
// 	) {
// 		this.abcNotes = abcNotes;
// 		this.baseLength = baseLength;
// 		this.signature = signature;
// 	}

// 	getAbcString(
// 		{ displaySignature, tempo }: { displaySignature?: boolean; tempo?: number } = {
// 			displaySignature: true,
// 		},
// 	): string {
// 		if (displaySignature) {
// 			return makeDrumAbcHeader(this.baseLength, this.signature) + this.abcNotes;
// 		}
// 		return makeDrumAbcHeader(this.baseLength) + this.abcNotes;
// 	}
// }

export const drumMap = {
	PHH: "XD",
	BD2: "E",
	BD1: "F",
	LFT: "G",
	HFT: "A",
	tambourine: "^B",
	S: "c",
	eS: "_c",
	low_wood_block: "^c",
	side_stick: "=c",
	LMT: "d",
	high_wood_block: "^d",
	HMT: "e",
	cowbell: "^e",
	HT: "f",
	R1: "X^f",
	CHH: "Xg",
	OHH: "X^g",
	C1: "Xa",
	open_triangle: "^a",
};

// export type composeAbcParams = {
// 	mapping?: boolean;
// 	signature?: TimeSignature;
// 	tempo?: number;
// 	baseLength?: NoteLength;
// };

// export const composeAbcDrumPart = (
// 	part: string,
// 	parameters: composeAbcParams = { mapping: true, baseLength: "1/8" },
// ) => {
// 	return (
// 		(parameters.mapping ? DRUM_MAPPING_STRING : "") +
// 		(parameters.signature ? `M: ${parameters.signature}\n` : "") +
// 		(parameters.tempo ? `Q: ${parameters.tempo}\n` : "") +
// 		(parameters.baseLength ? `L: ${parameters.baseLength}\n` : "") +
// 		"K: perc\n" +
// 		"%%score (1 2)\n" +
// 		"V:1\n" +
// 		part +
// 		"\nV:2\n"
// 	);
// };

// export const composeAbcDrumBarString = (bar: BarData, mapping?: boolean) => {
// 	return (
// 		(mapping ? DRUM_MAPPING_STRING : "") +
// 		(bar.signature ? `M: ${bar.signature}\n` : "") +
// 		(bar.baseLength ? `L: ${bar.baseLength}\n` : "") +
// 		"K: perc\n" +
// 		"V:1 stem=up\n" +
// 		bar.abcNotes
// 	);
// };

// export type BarData = {
// 	abcNotes: string;
// 	baseLength: NoteLength;
// 	signature?: TimeSignature;
// };
