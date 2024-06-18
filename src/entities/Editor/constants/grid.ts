import { SIGNATURE_TO_TICKS } from "src/shared/lib/consts/ticks";
import { TimeSignature } from "src/shared/lib/types/TimeSignature";
import p5 from "p5";

export const GRID_COLOR = {
	bold: 192,
	medium: 128,
	light: 100,
};

export const mapTickToPosition = (tick: number, p: p5, signature: TimeSignature) => {
	const tickCount = SIGNATURE_TO_TICKS[signature];
	return p.map(tick, 0, tickCount, 0, p.width);
};

export const GRID_RESOLUTIONS = ["1/4", "1/8", "1/16", "1/32", "1/8t", "1/16t", "1/32t"];

export const GRID_RESOLUTIONS_IN_TYPES = {
	straight: ["1/4", "1/8", "1/16", "1/32"],
	triplet: ["1/8t", "1/16t", "1/32t"],
};
