import { DrumType, TimeSignature, DrumBeatDuration } from "../types";

export const TICKS_IN_QUARTER: number = 24;
export const TICKS_IN_EIGHTH = TICKS_IN_QUARTER / 2;

export const durationAndTicks: [DrumBeatDuration, number][] = [
	["1/4", TICKS_IN_QUARTER],
	["1/8", TICKS_IN_EIGHTH],
	["1/16", TICKS_IN_EIGHTH / 2],
	["1/32", TICKS_IN_EIGHTH / 4],

	["1/8t", TICKS_IN_QUARTER / 3],
	["1/16t", TICKS_IN_EIGHTH / 3],
	["1/32t", TICKS_IN_EIGHTH / 6],
	["1/64t", TICKS_IN_EIGHTH / 12],
];

export const DURATION_TO_TICKS: Record<DrumBeatDuration, number> = {
	"1/4": TICKS_IN_QUARTER,
	"1/8": TICKS_IN_EIGHTH,
	"1/16": TICKS_IN_EIGHTH / 2,
	"1/32": TICKS_IN_EIGHTH / 4,

	"1/8t": TICKS_IN_QUARTER / 3,
	"1/16t": TICKS_IN_EIGHTH / 3,
	"1/32t": TICKS_IN_EIGHTH / 6,
	"1/64t": TICKS_IN_EIGHTH / 12,
};

export const SIGNATURE_TO_TICKS: Record<TimeSignature, number> = {
	"1/4": TICKS_IN_QUARTER * 1,
	"2/4": TICKS_IN_QUARTER * 2,
	"3/4": TICKS_IN_QUARTER * 3,
	"4/4": TICKS_IN_QUARTER * 4,
	"5/8": TICKS_IN_EIGHTH * 5,
	"6/8": TICKS_IN_EIGHTH * 6,
	"7/8": TICKS_IN_EIGHTH * 7,
};
