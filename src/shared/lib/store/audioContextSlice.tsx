import { createSlice } from "@reduxjs/toolkit";
import { create } from "domain";
import { createContext } from "vm";

export interface AudioContextState {
	context: AudioContext | null;
}

const initialState: AudioContextState = {
	context: null,
};

const audioContextSlice = createSlice({
	name: "audio",
	initialState,
	reducers: {
		createAudioContext(state) {
			const permission = window.confirm("Allow audio access?");
			if (!state.context && permission) {
				state.context = new AudioContext();
				console.log("Аудио контекст успешно создан.");
			} else {
				console.error("Ошибка при создании аудио контекста");
			}
		},
		removeAudioContext(state) {
			if (state.context) state.context.close();
		},
	},
});

export const { createAudioContext, removeAudioContext } = audioContextSlice.actions;
export default audioContextSlice.reducer;
