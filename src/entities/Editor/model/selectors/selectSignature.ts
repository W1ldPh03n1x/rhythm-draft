import { RootState } from "src/shared/lib/store";

export const selectSignature = (state: RootState) => state.editor.grid.signature;
