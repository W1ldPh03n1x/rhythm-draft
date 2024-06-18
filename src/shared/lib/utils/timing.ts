import { Grid } from "src/entities/Editor/model/types";
import { EDITOR_LEFT_PADDING } from "src/entities/Editor/constants";
import { TimeSignature } from "../types";
import { DURATION_TO_TICKS, SIGNATURE_TO_TICKS } from "../consts";

export const tickToPosition = (tick: number, width: number, signature: TimeSignature) => {
	const tickCount = SIGNATURE_TO_TICKS[signature];
	return (width / tickCount) * tick;
};

export const positionToTick = (position: number, width: number, signature: TimeSignature) => {
	const tickCount = SIGNATURE_TO_TICKS[signature];
	return position / (width / tickCount);
};

export const findNearestLine = (position: number, grid: Grid) => {
	let tickNumber = positionToTick(position, grid.width - EDITOR_LEFT_PADDING, grid.signature);
	let gridLineIndex = Math.max(
		Math.min(
			Math.round(tickNumber / DURATION_TO_TICKS[grid.resolution]),
			grid.structure.length - 1,
		),
		0,
	);
	return grid.structure[gridLineIndex];
};
