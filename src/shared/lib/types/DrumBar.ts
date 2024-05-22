import { getTsBuildInfoEmitOutputFilePath } from "typescript";
import { AbcDrumBar } from "../utils/abcDrumStrings";
import {
	DRUM_ALIAS_STRING,
	DRUM_MAPPING_STRING,
	DrumBeatDuration,
	StraightDuration,
	TripletDuration,
} from "../utils/drumConsts";
import { DrumType } from "./Drums";
import { Signature, TimeSignature, TimeSignatureString } from "./TimeSignature";

// type DrumBar = {
// 	signature: TimeSignature;
// 	tempo: number;
// 	beatTrack: OneBeat[];
// 	toAbcString: () => string;
// 	toggleDrum: (drum: DrumType, trackPosition: number) => void;
// };

type OneTick = Set<DrumType>;

const TICKS_IN_QUARTER: number = 24;
const TICKS_IN_EIGHTH = TICKS_IN_QUARTER / 2;

type DrumBarOptions = {
	tempo?: number;
	rootDuration?: DrumBeatDuration;
};

const TICKS_IN_DURATION = new Map<DrumBeatDuration, number>([
	["1/4", TICKS_IN_QUARTER],
	["1/8", TICKS_IN_EIGHTH],
	["1/16", TICKS_IN_EIGHTH / 2],
	["1/32", TICKS_IN_EIGHTH / 4],

	["1/8t", TICKS_IN_QUARTER / 3],
	["1/16t", TICKS_IN_EIGHTH / 3],
	["1/32t", TICKS_IN_EIGHTH / 6],
	["1/64t", TICKS_IN_EIGHTH / 12],
]);

const DURATIONS: DrumBeatDuration[] = [
	"1/4",
	"1/8",
	"1/8t",
	"1/16",
	"1/16t",
	"1/32",
	"1/32t",
	"1/64t",
];

function isTriplet(duration: DrumBeatDuration): duration is TripletDuration {
	return (
		(duration as TripletDuration) === "1/8t" ||
		(duration as TripletDuration) === "1/16t" ||
		(duration as TripletDuration) === "1/32t" ||
		(duration as TripletDuration) === "1/64t"
	);
}

const TICKS_TO_DURATION = new Map<number, DrumBeatDuration>(
	[...Array(TICKS_IN_QUARTER)].map((_, i) => [i + 1, calculateDurationLevel(i + 1)]),
);

const calculateDurationLevel = (ticks: number): DrumBeatDuration => {
	for (let duration of DURATIONS) {
		let ticksInDuration = TICKS_IN_DURATION.get(duration);
		if (ticksInDuration && ticks % ticksInDuration === 0) {
			return duration;
		}
	}
	return "1/64t";
};

type BeatBuffer = {
	beats: OneTick[];
	duration: StraightDuration;
	resolution: DrumBeatDuration;
};

const translateTicksToBuffer = (ticks: OneTick[] = []): BeatBuffer => {
	let resolution: DrumBeatDuration = "1/64t";
	const bufferDuration = "1/16";
	const buffer: BeatBuffer = {
		beats: ticks,
		duration: bufferDuration,
		resolution: resolution,
	};

	if (buffer.beats[1].size === 0 && buffer.beats[5].size === 0) {
		if (buffer.beats[2].size === 0 && buffer.beats[3].size === 0 && buffer.beats[4].size === 0)
			resolution = "1/16";
		else if (buffer.beats[3].size === 0) resolution = "1/32t";
		else resolution = "1/32";
	}

	buffer.resolution = resolution;
	if (resolution === "1/64t") return buffer;
	if (resolution === "1/32t") return { ...buffer, beats: [buffer.beats[0], buffer.beats[3]] };
	return {
		...buffer,
		beats: [buffer.beats[0], buffer.beats[2], buffer.beats[4]],
	};
};

const durationsTable = {
	"1/4": {
		"1/4": 1,
		"1/8": 2,
		"1/8t": 3,
		"1/16": 4,
		"1/16t": 6,
		"1/32": 8,
		"1/32t": 12,
		"1/64t": 24,
	},
	"1/8": {
		"1/8": 1,
		"1/16": 2,
		"1/16t": 3,
		"1/32": 4,
		"1/32t": 6,
	},
	"1/8t": {
		"1/8t": 1,
		"1/16t": 2,
		"1/32t": 4,
	},
	"1/16": {
		"1/16": 1,
		"1/32": 2,
		"1/32t": 3,
	},
	"1/16t": {
		"1/16t": 1,
		"1/32t": 2,
	},
	"1/32": {
		"1/32": 1,
	},
	"1/32t": {
		"1/32t": 1,
	},
	"1/64t": {
		"1/64t": 1,
	},
};

class DrumBar {
	constructor(signature: TimeSignatureString, options?: DrumBarOptions) {
		this.signature = new Signature(signature);
		this.tempo = options?.tempo || null;
		this.rootLenght = options?.rootDuration || "1/8";
		this.resizeBeatTrack(this.signature);
	}
	signature: TimeSignature;
	tempo: number | null;
	beatTrack: OneTick[] = [];
	rootLenght: DrumBeatDuration;

	resizeBeatTrack(signature: TimeSignature) {
		let actualTickNumber =
			signature.beatsPerBar *
			(signature.beatDuration === 4 ? TICKS_IN_QUARTER : TICKS_IN_EIGHTH);
		let currentTickNumber = this.beatTrack.length;

		if (actualTickNumber >= currentTickNumber) {
			this.beatTrack = this.beatTrack.concat(
				[...Array(actualTickNumber - currentTickNumber)].map(() => new Set<DrumType>()),
			);
		} else {
			this.beatTrack.length = actualTickNumber;
		}
	}

	changeSignature(signature: TimeSignature) {
		this.signature = signature;
		this.resizeBeatTrack(signature);
	}

	getAbcString({
		signature,
		tempo,
		rootLenght,
		mapping,
		alias,
	}: {
		mapping?: boolean;
		alias?: boolean;
		signature?: boolean;
		tempo?: boolean;
		rootLenght?: DrumBeatDuration;
	} = {}) {
		let abcString = "";
		if (mapping) abcString += DRUM_MAPPING_STRING;
		if (alias) abcString += DRUM_ALIAS_STRING;
		if (tempo) abcString += `[Q: ${this.tempo}]`;
		if (rootLenght) abcString += `[L: ${rootLenght}]`;
		if (signature) abcString += `[M: ${this.signature.toString()}]`;
		abcString += "[K: perc]";
		abcString += "[V: 1 up]";
		// ==============================
		// Parsing

		// основная идея парсинга beatTrack'а в том, что у меня будет минимальная единица чтения, это 1/16,
		// она содержит в себе три 32-е триоли или две 32-е ноты что можно выразить через 32-е секстоли
		// составить массив из этих 32 а потом его упрощать, то есть соединать паузы или продлевать длительности

		// сделано разбиение на блоки по 1/32 ноте, осталось сделать объединение этих блоков в более крупные блоки

		let buffersArray: BeatBuffer[] = [];
		const ticksInBuffer = TICKS_IN_DURATION.get("1/32")!;
		for (
			let bufferIndex = 0;
			bufferIndex < this.beatTrack.length / ticksInBuffer;
			bufferIndex++
		) {
			buffersArray.push(
				translateTicksToBuffer(
					this.beatTrack.slice(
						bufferIndex * ticksInBuffer,
						(bufferIndex + 1) * ticksInBuffer,
					),
				),
			);
		}
		let currentMaxDuration = buffersArray[0].duration;
	}

	toggleDrum(drum: DrumType, tick: number) {
		return;
	}
}
