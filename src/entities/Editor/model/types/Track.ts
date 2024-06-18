import { DrumType } from "src/shared/lib/types/Drums";
import { TimeSignature } from "src/shared/lib/types/TimeSignature";
import { GridResolution } from "./GridResolution";

export type DrumTracks = Record<DrumType, number[]>;
