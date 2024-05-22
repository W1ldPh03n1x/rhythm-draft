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

type DrumKit = {
	Ride: ["Ride", "RideBell"];
	Crash: ["Crash", "CrashBell"];
	HiHat: ["OpenHiHat", "ClosedHiHat", "PedalHiHat"];
	Tom1: "Tom1";
	Tom2: "Tom2";
	Tom3: "Tom3";
	Snare: ["Snare", "GhostSnare", "RimShot", "RimClick"];
	Kick: "Kick";
};

export type { DrumType };
