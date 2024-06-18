import {
	DRUMS_IN_ABC,
	DRUM_ALIAS_STRING,
	DRUM_MAPPING_STRING,
	DRUM_TYPES_IN_ORDER,
} from "src/shared/lib/consts";
import { DrumType } from "src/shared/lib/types/Drums";
import { TimeSignature } from "src/shared/lib/types/TimeSignature";
import { generateId } from "src/shared/lib/utils/generateId";
import { TICKS_IN_EIGHTH, TICKS_IN_QUARTER, durationAndTicks } from "src/shared/lib/consts/ticks";
import { DURATION_TO_TICKS, HiHatOffset, TICKS_TO_DURATION, bar16thGrouping } from "./consts";
import { buffer } from "stream/consumers";
import { getTimeSignatureComponents } from "src/shared/lib/utils";
import {
	DrumBeatDuration,
	StraightDuration,
	TimeTick,
	TripletDuration,
} from "src/shared/lib/types";

export type PatternKind = "rhythm" | "break";

const isTriplet = (duration: DrumBeatDuration): duration is TripletDuration => {
	return (
		(duration as TripletDuration) === "1/8t" ||
		(duration as TripletDuration) === "1/16t" ||
		(duration as TripletDuration) === "1/32t" ||
		(duration as TripletDuration) === "1/64t"
	);
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

// ситуации, когда можно объединить триоли:
// [1/2nt: *_b] [1/n: _] => [1/nt]: *b_]
// [1/n: *] [1/2nt: _b_] => [1/nt: *_b]
// [1/nt: *_b] [1/nt: _c_ ] => [2*1/nt: *bc]

const uniteTriplets = (buffer1: BeatBuffer, buffer2: BeatBuffer): BeatBuffer[] => {
	if (buffer1.resolution === "1/64t" && buffer2.resolution === "1/64t") return [buffer1, buffer2];
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

const concatBuffersToBar = (buffersOf16th: BeatBuffer[], signature: TimeSignature) => {
	const groupingArray = bar16thGrouping[signature] || [4, 4, 4, 4];
	let partStartIndex = 0;
	let unitedBuffersArray: BeatBuffer[][] = [];

	for (let barPart = 0; barPart < groupingArray.length; barPart++) {
		unitedBuffersArray.push([]);
		let partSize = groupingArray[barPart];
		let intermediateResult: BeatBuffer[] = [];

		for (let i = partStartIndex; i < partStartIndex + partSize; i += 2) {
			intermediateResult.push(...uniteBuffers(buffersOf16th[i], buffersOf16th[i + 1]));
		}

		for (let i = 0; i < intermediateResult.length; i++) {
			if (intermediateResult[i].duration === intermediateResult[i + 1]?.duration) {
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

const calculateHiHatCircleOffset = (tick: TimeTick) => {
	let lowestDrumIndex: number = 12;
	for (let i = 0; i < DRUM_TYPES_IN_ORDER.length; i++) {
		if (tick.has(DRUM_TYPES_IN_ORDER[i])) {
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

	for (let drum of DRUM_TYPES_IN_ORDER) {
		if (tick.has(drum)) abcTickInner += DRUMS_IN_ABC[drum] || "";
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
		// console.log(tick);
		abcString += translateTickToAbcNotes(tick, rootDuration, targetDuration);
	}
	return abcString;
};

// =========== CLASS DEFINITION =========== //
// основная идея парсинга beatTrack'а в том, что у меня будет минимальная единица чтения, это 1/16,
// она содержит в себе три 32-е триоли или две 32-е ноты что можно выразить через 32-е секстоли
// составить массив из этих 32 а потом его упрощать, то есть соединать паузы или продлевать длительности

type DrumBarOptions = {
	tempo?: number;
	rootDuration?: StraightDuration;
	color?: [r: number, g: number, b: number];
	type?: PatternKind;
	index?: number;
};

export class DrumPattern {
	constructor(signature: TimeSignature, options?: DrumBarOptions) {
		this.signature = signature;
		this.tempo = options?.tempo || null;
		this.rootLenght = options?.rootDuration || "1/8";
		this.color = options?.color || [255, 255, 255];
		this.type = options?.type || "rhythm";
		this.index = options?.index || null;

		this.resizeBeatTrack(this.signature);
	}
	signature: TimeSignature;
	tempo: number | null;
	tickTrack: TimeTick[] = [];
	rootLenght: StraightDuration;
	id: string = generateId();
	type: PatternKind;
	index: number | null;
	color: [r: number, g: number, b: number];

	resizeBeatTrack(signature: TimeSignature) {
		let [beatsPerBar, beatDuration] = getTimeSignatureComponents(signature);
		let actualTickNumber =
			beatsPerBar * (beatDuration === 4 ? TICKS_IN_QUARTER : TICKS_IN_EIGHTH);
		let currentTickNumber = this.tickTrack.length;

		if (actualTickNumber >= currentTickNumber) {
			this.tickTrack = this.tickTrack.concat(
				[...Array(actualTickNumber - currentTickNumber)].map(() => new Set<DrumType>()),
			);
		} else {
			this.tickTrack.length = actualTickNumber;
		}
	}

	changeSignature(signature: TimeSignature) {
		this.signature = signature;
		this.resizeBeatTrack(signature);
	}

	setType(type: "rhythm" | "break") {
		this.type = type;
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
		abcString += `[L: ${rootLenght || this.rootLenght}]`;
		if (signature) abcString += `[M: ${this.signature.toString()}]`;
		abcString += "[K: perc]";
		abcString += "[V: 1 up]";

		// сделано разбиение на блоки по 1/32 ноте, осталось сделать объединение этих блоков в более крупные блоки

		let buffersArray: BeatBuffer[] = [];
		const ticksInBuffer = DURATION_TO_TICKS.get("1/16")!;
		for (
			let bufferIndex = 0;
			bufferIndex < this.tickTrack.length / ticksInBuffer;
			bufferIndex++
		) {
			buffersArray.push(
				translateTicksToBuffer(
					this.tickTrack.slice(
						bufferIndex * ticksInBuffer,
						(bufferIndex + 1) * ticksInBuffer,
					),
				),
			);
		}
		let abcPatternString = "";
		let barInBuffers = concatBuffersToBar(buffersArray, this.signature);
		// console.log(barInBuffers);
		for (let i = 0; i < barInBuffers.length; i++) {
			for (let buffer of barInBuffers[i]) {
				abcPatternString += translateBufferToAbcString(
					buffer,
					rootLenght || this.rootLenght,
				);
			}
			abcPatternString += " ";
		}

		abcString += abcPatternString;
		return abcString;
	}

	toggleDrum(drum: DrumType, tick: number) {
		if (!this.tickTrack[tick].delete(drum)) this.tickTrack[tick].add(drum);
	}
}
