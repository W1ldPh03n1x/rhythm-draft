import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { DrumPattern } from "src/entities/Pattern/model/types";
import { TimeSignature } from "src/shared/lib/types";
import { DrumTracks, Grid, GridResolution } from "../types";
import { convertPatternToTracks, makeEmptyDrumTracks, makeGridStructure } from "../../lib";

interface EditorState {
	grid: Grid;
	currentPattern: {
		id: string | null;
		abc: string | null;
	};
	isVisible: boolean;
	drumTracks: DrumTracks;
}

const DEFAULT_GRID_RESOLUTION = "1/16";
const DEFAULT_GRID_STRUCTURE = makeGridStructure(DEFAULT_GRID_RESOLUTION, "4/4");
const DEFAULT_GRID_WIDTH = 920;

const initialState: EditorState = {
	grid: {
		structure: DEFAULT_GRID_STRUCTURE,
		resolution: DEFAULT_GRID_RESOLUTION,
		width: DEFAULT_GRID_WIDTH,
		signature: "4/4",
	},
	currentPattern: {
		id: null,
		abc: null,
	},
	isVisible: false,
	drumTracks: makeEmptyDrumTracks(),
};

const editorSlice = createSlice({
	name: "editor",
	initialState,
	reducers: {
		setCurrentPattern(state, action: PayloadAction<{ pattern: DrumPattern }>) {
			state.currentPattern.abc = action.payload.pattern.getAbcString();
			state.currentPattern.id = action.payload.pattern.id;
			state.drumTracks = convertPatternToTracks(action.payload.pattern);
			const newStructure = makeGridStructure(
				state.grid.resolution,
				action.payload.pattern.signature,
			);
			state.grid.structure = newStructure;
			state.grid.signature = action.payload.pattern.signature;
		},
		setGridResolution(state, action: PayloadAction<{ resolution: GridResolution }>) {
			state.grid.resolution = action.payload.resolution;
			const structure = makeGridStructure(
				action.payload.resolution,
				state.grid.signature || "4/4",
			);
			state.grid.structure = structure;
		},
		setSignature(state, action: PayloadAction<{ signature: TimeSignature }>) {
			state.grid.signature = action.payload.signature;
			state.grid.structure = makeGridStructure(
				state.grid.resolution,
				action.payload.signature,
			);
		},
		toggleEditor(state) {
			state.isVisible = !state.isVisible;
		},
		setGridWidth(state, action: PayloadAction<{ width: number }>) {
			state.grid.width = action.payload.width;
		},
	},
});

export const { setCurrentPattern, setGridResolution, setSignature, toggleEditor, setGridWidth } =
	editorSlice.actions;
export default editorSlice.reducer;
