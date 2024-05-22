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

export const DRUM_ALIAS_STRING = `U: X=+style=x+\nU: O=+open+\n`;

export const ROOT_BEAT_LENGTH = "1/8";

export const STRAIGHT_DURATIONS = ["1/4", "1/8", "1/16", "1/32"];
export const TRIPLET_DURATIONS = ["1/8t", "1/16t", "1/32t", "1/64t"];

export type StraightDuration = "1/4" | "1/8" | "1/16" | "1/32";
export type TripletDuration = "1/8t" | "1/16t" | "1/32t" | "1/64t";
export type DrumBeatDuration = StraightDuration | TripletDuration;
