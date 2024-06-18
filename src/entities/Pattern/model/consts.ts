import { durationAndTicks } from "src/shared/lib/consts/ticks";
import { DrumBeatDuration } from "src/shared/lib/types";

export const DURATION_TO_TICKS = new Map<DrumBeatDuration, number>(durationAndTicks);
export const TICKS_TO_DURATION = new Map<number, DrumBeatDuration>(
	durationAndTicks.map(([value, ticks]) => [ticks, value]),
);

export const bar16thGrouping = {
	"1/4": [4],
	"2/4": [4, 4],
	"3/4": [4, 4, 4],
	"4/4": [4, 4, 4, 4],
	"5/8": [4, 6],
	"6/8": [6, 6],
	"7/8": [4, 4, 6],
};

export const HiHatOffset = [
	"@-3.7,22", //	PedalHiHat
	"@-3.7,14", //		Kick
	"@-3.7,6.5", //		Tom3
	"@-3.7,-1.5", //	Snare
	"@-3.7,-1.5", //	RimShot
	"@-3.7,-1.5", //	RimClick
	"@-3.7,-1.5", //	GhostSnare
	"@-3.7,-5.5", //	Tom2
	"@-3.7,-9", //		Tom3
	"@8,-13", //			Ride
	"@8,-13", //			RideBell
	"@-3.7,-17", //		ClosedHiHat
	"@-3.7,-17", //		OpenHiHat
	"@-3.7,-17", //		Crash
	"@-3.7,-17", //		CrashBell
];
