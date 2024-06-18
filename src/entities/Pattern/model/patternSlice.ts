import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DrumPattern } from "./types";

interface PatternState {
	list: DrumPattern[];
}

const initialState: PatternState = {
	list: [
		new DrumPattern("4/4", { type: "rhythm", index: 1 }),
		new DrumPattern("6/8", { type: "rhythm", index: 2 }),
		new DrumPattern("5/8", { type: "rhythm", index: 3 }),
		new DrumPattern("7/8", { type: "rhythm", index: 4 }),
	],
};

initialState.list[0].toggleDrum("OpenHiHat", 0);
initialState.list[0].toggleDrum("OpenHiHat", 12);
initialState.list[0].toggleDrum("OpenHiHat", 24);
initialState.list[0].toggleDrum("OpenHiHat", 36);
initialState.list[0].toggleDrum("OpenHiHat", 48);
initialState.list[0].toggleDrum("OpenHiHat", 60);
initialState.list[0].toggleDrum("OpenHiHat", 72);
initialState.list[0].toggleDrum("OpenHiHat", 84);

initialState.list[0].toggleDrum("Kick", 0);
initialState.list[0].toggleDrum("Kick", 48);
initialState.list[0].toggleDrum("Kick", 60);

initialState.list[0].toggleDrum("Snare", 24);
initialState.list[0].toggleDrum("Snare", 72);

initialState.list[1].toggleDrum("OpenHiHat", 0);
initialState.list[1].toggleDrum("OpenHiHat", 12);
initialState.list[1].toggleDrum("OpenHiHat", 24);
initialState.list[1].toggleDrum("OpenHiHat", 36);
initialState.list[1].toggleDrum("OpenHiHat", 48);
initialState.list[1].toggleDrum("OpenHiHat", 60);

initialState.list[1].toggleDrum("Kick", 0);
initialState.list[1].toggleDrum("Kick", 36);
initialState.list[1].toggleDrum("Kick", 60);

initialState.list[1].toggleDrum("Snare", 24);

initialState.list[2].toggleDrum("ClosedHiHat", 0);
initialState.list[2].toggleDrum("ClosedHiHat", 12);
initialState.list[2].toggleDrum("ClosedHiHat", 24);
initialState.list[2].toggleDrum("ClosedHiHat", 36);
initialState.list[2].toggleDrum("ClosedHiHat", 48);

initialState.list[3].toggleDrum("ClosedHiHat", 0);
initialState.list[3].toggleDrum("ClosedHiHat", 12);
initialState.list[3].toggleDrum("ClosedHiHat", 24);
initialState.list[3].toggleDrum("ClosedHiHat", 36);
initialState.list[3].toggleDrum("ClosedHiHat", 48);
initialState.list[3].toggleDrum("ClosedHiHat", 60);
initialState.list[3].toggleDrum("ClosedHiHat", 72);

const patternSlice = createSlice({
	name: "pattern",
	initialState,
	reducers: {
		addPattern(state, action: PayloadAction<{ pattern: DrumPattern }>) {
			state.list.push(action.payload.pattern);
		},
		removePattern(state, action: PayloadAction<{ patternId: string }>) {
			state.list = state.list.filter((pattern) => pattern.id !== action.payload.patternId);
		},
		editPattern(state, action: PayloadAction<{ pattern: DrumPattern }>) {
			state.list = state.list.map((pattern) =>
				pattern.id === action.payload.pattern.id ? action.payload.pattern : pattern,
			);
		},
	},
});

export const { addPattern, removePattern, editPattern } = patternSlice.actions;
export default patternSlice.reducer;
