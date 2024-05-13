export const DRUM_MAPPING_STRING = `%%MIDI drummap D   44 % pedal hi-hat
%%MIDI drummap E   36 % bass drum 1
%%MIDI drummap F   35 % acoustic bass drum
%%MIDI drummap G   41 % low floor tom-tom
%%MIDI drummap A   43 % high floor tom-tom
%%MIDI drummap B   45 % low tom-tom
%%MIDI drummap ^B  54 % tambourine
%%MIDI drummap c   38 % acoustic snare
%%MIDI drummap _c  40 % electric snare
%%MIDI drummap ^c  77 % low wood block
%%MIDI drummap =c  37 % side stick
%%MIDI drummap d   47 % low-mid tom tom
%%MIDI drummap ^d  76 % high wood block
%%MIDI drummap e   48 % high-mid tom tom
%%MIDI drummap ^e  56 % cowbell
%%MIDI drummap f   50 % high tom tom
%%MIDI drummap ^f  51 % ride cymbal 1
%%MIDI drummap g   42 % closed hi-hat
%%MIDI drummap ^g  46 % open hi-hat
%%MIDI drummap a   49 % crash cymbal 1
%%MIDI drummap ^a  81 % open triangle
%MIDI channel 10
`;

export const DRUM_ALIAS_STRING = `U: X=+style=x+\nU: O=+open+\n`;

const makeDrumAbcHeader = (
	baseLength: NoteLength = "1/8",
	signature?: TimeSignature,
	tempo?: number,
) => {
	return (
		DRUM_MAPPING_STRING +
		DRUM_ALIAS_STRING +
		(tempo ? `Q: ${tempo}\n` : "") +
		`L: ${baseLength}\nK: perc\nM:${signature || ""}\nV:1 up\n`
	);
};

export class AbcDrumBar {
	abcNotes: string;
	baseLength: NoteLength;
	signature: TimeSignature;

	constructor(
		abcNotes: string,
		baseLength: NoteLength = "1/8",
		signature: TimeSignature = "4/4",
	) {
		this.abcNotes = abcNotes;
		this.baseLength = baseLength;
		this.signature = signature;
	}

	getAbcString(
		{ displaySignature, tempo }: { displaySignature?: boolean; tempo?: number } = {
			displaySignature: true,
		},
	): string {
		if (displaySignature) {
			return makeDrumAbcHeader(this.baseLength, this.signature) + this.abcNotes;
		}
		return makeDrumAbcHeader(this.baseLength) + this.abcNotes;
	}
}

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

export type TimeSignature = "2/4" | "3/4" | "4/4" | "5/4" | "5/8" | "6/8" | "7/8" | "8/8";
export type composeAbcParams = {
	mapping?: boolean;
	signature?: TimeSignature;
	tempo?: number;
	baseLength?: NoteLength;
};
export type NoteLength = "1/1" | "1/2" | "1/4" | "1/8" | "1/16" | "1/32";

export const composeAbcDrumPart = (
	part: string,
	parameters: composeAbcParams = { mapping: true, baseLength: "1/8" },
) => {
	return (
		(parameters.mapping ? DRUM_MAPPING_STRING : "") +
		(parameters.signature ? `M: ${parameters.signature}\n` : "") +
		(parameters.tempo ? `Q: ${parameters.tempo}\n` : "") +
		(parameters.baseLength ? `L: ${parameters.baseLength}\n` : "") +
		"K: perc\n" +
		"%%score (1 2)\n" +
		"V:1\n" +
		part +
		"\nV:2\n"
	);
};

export const composeAbcDrumBarString = (bar: BarData, mapping?: boolean) => {
	return (
		(mapping ? DRUM_MAPPING_STRING : "") +
		(bar.signature ? `M: ${bar.signature}\n` : "") +
		(bar.baseLength ? `L: ${bar.baseLength}\n` : "") +
		"K: perc\n" +
		"V:1 stem=up\n" +
		bar.abcNotes
	);
};

export type BarData = {
	abcNotes: string;
	baseLength: NoteLength;
	signature?: TimeSignature;
};
