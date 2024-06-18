import { TimeSignature } from "src/shared/lib/types";
import { GridLine, GridResolution } from "./index";

export type Grid = {
	resolution: GridResolution;
	signature: TimeSignature;
	width: number;
	structure: GridLine[];
};
