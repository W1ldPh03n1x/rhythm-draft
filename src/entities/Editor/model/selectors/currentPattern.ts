import { RootState } from "src/shared/lib/store";

export const selectCurrentPattern = (state: RootState) => state.editor.currentPattern;
