import { RootState } from "src/shared/lib/store";
import { DrumPattern } from "./types";

export const selectPatternList = (state: RootState): DrumPattern[] => state.patterns.list;
