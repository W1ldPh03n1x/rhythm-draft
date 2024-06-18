import { RootState } from ".";

export const selectAudioContext = (state: RootState) => state.audioContext.context;
