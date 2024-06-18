import { DrumName, DrumType } from "../types";

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
export const ABC_DRUM_NOTES = ["D", "F", "A", "c", "d", "e", "f", "g", "a"];

export const DRUM_ALIAS_STRING = `U: X=+style=x+\nU: O=+open+\nU: H=+style=harmonic+\n`;

export const ROOT_BEAT_LENGTH = "1/8";

export const STRAIGHT_DURATIONS = ["1/4", "1/8", "1/16", "1/32"];

export const TRIPLET_DURATIONS = ["1/8t", "1/16t", "1/32t", "1/64t"];

export const durationsTable = {
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

export const DRUMS_IN_ABC: Record<DrumType, string> = {
	OpenHiHat: "X^g",
	ClosedHiHat: "Xg",
	PedalHiHat: "XD",
	Snare: "c",
	RimShot: "Hc",
	RimClick: "X=c",
	GhostSnare: "_c",
	Kick: "F",
	Ride: "X^f",
	RideBell: "H^f",
	Crash: "Xa",
	CrashBell: "Ha",
	Tom1: "e",
	Tom2: "d",
	Tom3: "b",
};

export const DRUM_TYPES_IN_ORDER: DrumType[] = [
	"PedalHiHat",
	"Kick",
	"Tom3",
	"Snare",
	"RimShot",
	"RimClick",
	"GhostSnare",
	"Tom2",
	"Tom1",
	"Ride",
	"RideBell",
	"ClosedHiHat",
	"OpenHiHat",
	"Crash",
	"CrashBell",
];
// DRUM_KIT[DrumName][0] - это основной тип кдара этого барабана
export const DRUM_KIT: Record<DrumName, DrumType[]> = {
	Ride: ["Ride", "RideBell"],
	Crash: ["Crash", "CrashBell"],
	HiHat: ["ClosedHiHat", "OpenHiHat", "PedalHiHat"],
	Tom1: ["Tom1"],
	Tom2: ["Tom2"],
	Tom3: ["Tom3"],
	Snare: ["Snare", "GhostSnare", "RimShot", "RimClick"],
	Kick: ["Kick"],
};

export const DRUM_MODS: Record<DrumType, string> = {
	Ride: "Edge",
	RideBell: "Bell",

	Crash: "Edge",
	CrashBell: "Bell",

	OpenHiHat: "Open",
	ClosedHiHat: "Closed",
	PedalHiHat: "Pedal",

	Tom1: "Tom 1",
	Tom2: "Tom 2",
	Tom3: "Tom 3",

	RimShot: "Rimshot",
	Snare: "Center",
	GhostSnare: "Ghost",
	RimClick: "Rimclick",

	Kick: "Kick",
};

export const DRUM_NAMES: Record<DrumName, string> = {
	Crash: "Crash",
	Ride: "Ride",
	HiHat: "Hi Hat",
	Tom1: "Tom 1",
	Tom2: "Tom 2",
	Tom3: "Tom 3",
	Snare: "Snare",
	Kick: "Kick",
};
