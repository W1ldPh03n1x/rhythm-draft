import { RootState } from "src/shared/lib/store";

export const selectGrid = (state: RootState) => state.editor.grid;
