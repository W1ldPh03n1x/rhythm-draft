import { getTsBuildInfoEmitOutputFilePath } from "typescript";
import { AbcDrumBar } from "../utils/abcDrumStrings";
import {
	DRUM_ALIAS_STRING,
	DRUM_MAPPING_STRING,
	DrumBeatDuration,
	StraightDuration,
	TripletDuration,
} from "../utils/drumConsts";
import { DrumType, DrumsInAbc, drumTypesInOrder } from "./Drums";
import { Signature, TimeSignature, TimeSignatureString } from "./TimeSignature";
import { lstat } from "fs";
import { resolve } from "path";
import { get } from "http";

// type DrumBar = {
// 	signature: TimeSignature;
// 	tempo: number;
// 	beatTrack: OneBeat[];
// 	toAbcString: () => string;
// 	toggleDrum: (drum: DrumType, trackPosition: number) => void;
// };

type TimeTick = Set<DrumType>;

const TICKS_IN_QUARTER: number = 24;
const TICKS_IN_EIGHTH = TICKS_IN_QUARTER / 2;

type DrumBarOptions = {
	tempo?: number;
	rootDuration?: StraightDuration;
};

const durationAndTicks: [DrumBeatDuration, number][] = [
	["1/4", TICKS_IN_QUARTER],
	["1/8", TICKS_IN_EIGHTH],
	["1/16", TICKS_IN_EIGHTH / 2],
	["1/32", TICKS_IN_EIGHTH / 4],

	["1/8t", TICKS_IN_QUARTER / 3],
	["1/16t", TICKS_IN_EIGHTH / 3],
	["1/32t", TICKS_IN_EIGHTH / 6],
	["1/64t", TICKS_IN_EIGHTH / 12],
];

const DURATION_TO_TICKS = new Map<DrumBeatDuration, number>(durationAndTicks);
const TICKS_TO_DURATION = new Map<number, DrumBeatDuration>(
	durationAndTicks.map(([value, ticks]) => [ticks, value]),
);

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

const TICKS_TO_DURATION_LEVEL = new Map<number, DrumBeatDuration>(
	[...Array(TICKS_IN_QUARTER)].map((_, i) => [i + 1, calculateDurationLevel(i + 1)]),
);

const calculateDurationLevel = (ticks: number): DrumBeatDuration => {
	for (let duration of DURATIONS) {
		let ticksInDuration = DURATION_TO_TICKS.get(duration);
		if (ticksInDuration && ticks % ticksInDuration === 0) {
			return duration;
		}
	}
	return "1/64t";
};

type BeatBuffer = {
	beats: TimeTick[];
	duration: StraightDuration;
	resolution: DrumBeatDuration;
};

const increaseDuration = (duration: DrumBeatDuration) => {
	return TICKS_TO_DURATION.get(DURATION_TO_TICKS.get(duration)! * 2)!;
};
const decreaseDuration = (duration: DrumBeatDuration) => {
	return TICKS_TO_DURATION.get(DURATION_TO_TICKS.get(duration)! / 2)!;
};
const toTripletDuration = (duration: DrumBeatDuration) => {
	if (isTriplet(duration)) return duration as TripletDuration;
	return (duration + "t") as TripletDuration;
};
const toStraightDuration = (duration: DrumBeatDuration) => {
	if (isTriplet(duration)) return duration.slice(0, -1) as StraightDuration;
	return duration as StraightDuration;
};

const translateTicksToBuffer = (ticks: TimeTick[] = []): BeatBuffer => {
	const buffer: BeatBuffer = {
		beats: ticks,
		duration: "1/16",
		resolution: "1/64t",
	};

	if (buffer.beats[1].size === 0 && buffer.beats[5].size === 0) {
		if (
			buffer.beats[2].size === 0 &&
			buffer.beats[3].size === 0 &&
			buffer.beats[4].size === 0
		) {
			buffer.resolution = "1/16";
			buffer.beats = [ticks[0]];
		} else if (buffer.beats[3].size === 0) {
			buffer.resolution = "1/32t";
			buffer.beats = [ticks[0], ticks[2], ticks[4]];
		} else {
			buffer.resolution = "1/32";
			buffer.beats = [ticks[0], ticks[3]];
		}
	}
	return buffer;
};

const bar16thGrouping = {
	"1/4": [4],
	"2/4": [4, 4],
	"3/4": [4, 4, 4],
	"4/4": [4, 4, 4, 4],
	"5/8": [4, 6],
	"6/8": [6, 6],
	"7/8": [4, 4, 6],
};

// ситуации, когда можно объединить триоли:
// [1/2nt: *_b] [1/n: _] => [1/nt]: *b_]
// [1/n: *] [1/2nt: _b_] => [1/nt: *_b]
// [1/nt: *_b] [1/nt: _c_ ] => [2*1/nt: *bc]

const uniteTriplets = (buffer1: BeatBuffer, buffer2: BeatBuffer): BeatBuffer[] => {
	if (buffer1.resolution !== "1/64t" && buffer2.resolution !== "1/64t") return [buffer1, buffer2];
	if (isTriplet(buffer1.resolution) && isTriplet(buffer2.resolution)) {
		if (
			buffer1.beats[1].size === 0 &&
			buffer2.beats[0].size === 0 &&
			buffer2.beats[2].size === 0
		)
			return [
				{
					duration: increaseDuration(buffer1.duration) as StraightDuration,
					resolution: increaseDuration(buffer1.resolution),
					beats: [buffer1.beats[0], buffer1.beats[2], buffer2.beats[1]],
				},
			];
	} else if (isTriplet(buffer1.resolution)) {
		if (buffer2.beats[0].size === 0 && buffer1.beats[1].size === 0)
			return [
				{
					duration: increaseDuration(buffer1.duration) as StraightDuration,
					resolution: increaseDuration(buffer1.resolution),
					beats: [buffer1.beats[0], buffer1.beats[2], new Set<DrumType>()],
				},
			];
	} else if (isTriplet(buffer2.resolution)) {
		if (buffer2.beats[0].size === 0 && buffer2.beats[2].size === 0)
			return [
				{
					duration: increaseDuration(buffer1.duration) as StraightDuration,
					resolution: increaseDuration(buffer2.resolution),
					beats: [buffer1.beats[0], new Set<DrumType>(), buffer2.beats[1]],
				},
			];
	}
	return [buffer1, buffer2];
};

// [1/n: *] [1/n: _] => [2*1/n: x]
// [1/n: *] [1/n: x] => [1/n: *x]
const uniteStraight = (buffer1: BeatBuffer, buffer2: BeatBuffer): BeatBuffer[] => {
	if (buffer1.duration === buffer2.duration) {
		if (buffer1.resolution === buffer2.resolution) {
			if (buffer2.beats[0].size === 0 && buffer1.resolution === buffer1.duration) {
				return [
					{
						duration: increaseDuration(buffer1.duration) as StraightDuration,
						resolution: increaseDuration(buffer1.resolution),
						beats: [buffer1.beats[0]],
					},
				];
			} else {
				return [
					{
						duration: increaseDuration(buffer1.duration) as StraightDuration,
						resolution: buffer1.resolution,
						beats: [...buffer1.beats, ...buffer2.beats],
					},
				];
			}
		}
	}
	return [buffer1, buffer2];
};

const uniteBuffers = (buffer1: BeatBuffer, buffer2: BeatBuffer): BeatBuffer[] => {
	if (buffer1.duration !== buffer2.duration) return [buffer1, buffer2];
	if (
		buffer1.resolution !== buffer2.resolution &&
		(isTriplet(buffer1.resolution) || isTriplet(buffer2.resolution))
	) {
		if (
			(buffer1.resolution === toStraightDuration(increaseDuration(buffer2.resolution)) &&
				buffer1.resolution === buffer1.duration) ||
			(buffer2.resolution === toStraightDuration(increaseDuration(buffer1.resolution)) &&
				buffer2.resolution === buffer2.duration)
		) {
			return uniteTriplets(buffer1, buffer2);
		}
	} else if (buffer1.resolution === buffer2.resolution) {
		if (isTriplet(buffer1.resolution)) {
			return uniteTriplets(buffer1, buffer2);
		} else {
			return uniteStraight(buffer1, buffer2);
		}
	}
	return [buffer1, buffer2];
};

const concatBuffersToBar = (buffersOf16th: BeatBuffer[], signature: TimeSignatureString) => {
	const groupingArray = bar16thGrouping[signature] || [4, 4, 4, 4];
	let partStartIndex = 0;
	let unitedBuffersArray: BeatBuffer[][] = [];
	for (let barPart = 0; barPart < groupingArray.length; barPart++) {
		unitedBuffersArray.push([]);
		let partSize = groupingArray[barPart];
		let intermediateResult: BeatBuffer[] = [];
		for (let i = partStartIndex; i < partStartIndex + partSize; i += 2) {
			intermediateResult.push(...uniteBuffers(buffersOf16th[i], buffersOf16th[i]));
		}
		for (let i = 0; i < intermediateResult.length; i++) {
			if (intermediateResult[i].duration === intermediateResult[i + 1].duration) {
				unitedBuffersArray[barPart].push(
					...uniteBuffers(intermediateResult[i], intermediateResult[i + 1]),
				);
				i += 1;
			} else {
				unitedBuffersArray[barPart].push(intermediateResult[i]);
			}
		}
		partStartIndex += partSize;
	}
	return unitedBuffersArray;
};

const HiHatOffset = [
	"@-2.1,22.8", //	PedalHiHat
	"@-2.1,15", //		Kick
	"@-2.1,7.5", //		Tom3
	"@-2.1,-0.5", //	Snare
	"@-2.1,-0.5", //	RimShot
	"@-2.1,-0.5", //	RimClick
	"@-2.1,-0.5", //	GhostSnare
	"@-2.1,-4.5", //	Tom2
	"@-2.1,-8", //		Tom3
	"@8,-12", //			Ride
	"@8,-12", //			RideBell
	"@-2.1,-16", //		ClosedHiHat
	"@-2.1,-16", //		OpenHiHat
	"@-2.1,-16", //		Crash
	"@-2.1,-16", //		CrashBell
];

const calculateHiHatCircleOffset = (tick: TimeTick) => {
	let lowestDrumIndex: number = 12;
	for (let i = 0; i < drumTypesInOrder.length; i++) {
		if (tick.has(drumTypesInOrder[i])) {
			lowestDrumIndex = i;
			break;
		}
	}
	return HiHatOffset[lowestDrumIndex];
};

const getAbcDurationPostfixString = (
	rootDuration: StraightDuration,
	targetDuration: StraightDuration,
) => {
	const targetDurationInTicks = DURATION_TO_TICKS.get(targetDuration)!;
	const rootDurationInTicks = DURATION_TO_TICKS.get(rootDuration)!;
	if (targetDurationInTicks <= rootDurationInTicks) {
		let slashCount = rootDurationInTicks / targetDurationInTicks - 1;
		return "/".repeat(slashCount);
	} else {
		let rootTimes = targetDurationInTicks / rootDurationInTicks;
		return `${rootTimes}`;
	}
};

const translateTickToAbcNotes = (
	tick: TimeTick,
	rootDuration: StraightDuration,
	targetDuration: StraightDuration,
) => {
	let abcTickInner = "";
	let abcTickPrefix = "";
	let abcTickPostfix = getAbcDurationPostfixString(rootDuration, targetDuration);
	if (tick.size === 0) return "z" + abcTickPostfix;

	if (tick.has("OpenHiHat")) abcTickPrefix += `\"${calculateHiHatCircleOffset(tick)}〇\"`;

	for (let drum of drumTypesInOrder) {
		if (tick.has(drum)) abcTickInner += DrumsInAbc.get(drum) || "";
	}
	return `${abcTickPrefix}[${abcTickInner}]${abcTickPostfix}`;
};

const translateBufferToAbcString = (buffer: BeatBuffer, rootDuration: StraightDuration) => {
	let abcString = "";
	const targetDuration = isTriplet(buffer.resolution)
		? (decreaseDuration(buffer.duration) as StraightDuration)
		: buffer.resolution;

	if (isTriplet(buffer.resolution)) {
		abcString += buffer.resolution === "1/64t" ? "(6" : "(3";
	}
	for (let tick of buffer.beats) {
		abcString += translateTickToAbcNotes(tick, rootDuration, targetDuration);
	}
	return abcString;
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
	beatTrack: TimeTick[] = [];
	rootLenght: StraightDuration;

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
		rootLenght?: StraightDuration;
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
		const ticksInBuffer = DURATION_TO_TICKS.get("1/32")!;
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
		let abcPatternString = "";
		let barInBuffers = concatBuffersToBar(buffersArray, this.signature.toString());
		for (let i = 0; i < barInBuffers.length; i++) {
			for (let buffer of barInBuffers[i]) {
				abcPatternString += translateBufferToAbcString(
					buffer,
					rootLenght || this.rootLenght,
				);
			}
			abcPatternString += " ";
		}
	}

	toggleDrum(drum: DrumType, tick: number) {
		if (!this.beatTrack[tick].delete(drum)) this.beatTrack[tick].add(drum);
	}
}
