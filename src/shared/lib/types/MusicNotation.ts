export type NoteLength =
	| "1/1"
	| "1/2"
	| "1/4"
	| "1/8"
	| "1/16"
	| "1/32"
	| "1/2t"
	| "1/4t"
	| "1/8t"
	| "1/16t"
	| "1/32t"
	| "1/64t";

export type StraightDuration = "1/4" | "1/8" | "1/16" | "1/32";
export type TripletDuration = "1/8t" | "1/16t" | "1/32t" | "1/64t";
export type DrumBeatDuration = StraightDuration | TripletDuration;
