type DrumType =
	| "OpenHiHat"
	| "ClosedHiHat"
	| "PedalHiHat"
	| "Snare"
	| "RimShot"
	| "RimClick"
	| "GhostSnare"
	| "Kick"
	| "Ride"
	| "RideBell"
	| "Crash"
	| "CrashBell"
	| "Tom1"
	| "Tom2"
	| "Tom3";

export const DrumKit = {
	Ride: ["Ride", "RideBell"],
	Crash: ["Crash", "CrashBell"],
	HiHat: ["OpenHiHat", "ClosedHiHat", "PedalHiHat"],
	Tom1: "Tom1",
	Tom2: "Tom2",
	Tom3: "Tom3",
	Snare: ["Snare", "GhostSnare", "RimShot", "RimClick"],
	Kick: "Kick",
};

export const DrumsInAbc = new Map<DrumType, string>([
	["OpenHiHat", "X^g"],
	["ClosedHiHat", "Xg"],
	["PedalHiHat", "XD"],
	["Snare", "c"],
	["RimShot", "Hc"],
	["RimClick", "X=c"],
	["GhostSnare", "_c"],
	["Kick", "F"],
	["Ride", "X^f"],
	["RideBell", "H^f"],
	["Crash", "Xa"],
	["CrashBell", "Ha"],
	["Tom1", "e"],
	["Tom2", "d"],
	["Tom3", "b"],
]);

export const drumTypesInOrder: DrumType[] = [
	"PedalHiHat",
	"Kick",
	"Tom3",
	"Snare",
	"RimShot",
	"RimClick",
	"GhostSnare",
	"Tom2",
	"Tom3",
	"Ride",
	"RideBell",
	"ClosedHiHat",
	"OpenHiHat",
	"Crash",
	"CrashBell",
];

export type { DrumType };
