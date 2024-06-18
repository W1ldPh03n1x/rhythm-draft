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

type DrumName = "Kick" | "Snare" | "Tom1" | "Tom2" | "Tom3" | "HiHat" | "Ride" | "Crash";

type HiHat = "OpenHiHat" | "ClosedHiHat" | "PedalHiHat";
type Snare = "Snare" | "GhostSnare" | "RimShot" | "RimClick";
type Kick = "Kick";
type Tom1 = "Tom1";
type Tom2 = "Tom2";
type Tom3 = "Tom3";
type Ride = "Ride" | "RideBell";
type Crash = "Crash" | "CrashBell";

export type { DrumType, DrumName, Kick, Snare, Tom1, Tom2, Tom3, HiHat, Ride, Crash };
