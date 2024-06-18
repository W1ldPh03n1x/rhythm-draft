import { RootState } from "src/shared/lib/store";

export const selectDrumTracks = (state: RootState) => state.editor.drumTracks;
