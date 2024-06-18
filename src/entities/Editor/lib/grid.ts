import p5 from "p5";
import { EDITOR_LEFT_PADDING, GRID_COLOR } from "../constants";
import { Grid, GridLine, GridLineWeight, GridResolution } from "../model/types";
import {
	SIGNATURE_TO_TICKS,
	TICKS_IN_EIGHTH,
	TICKS_IN_QUARTER,
	DURATION_TO_TICKS,
} from "src/shared/lib/consts";
import { TimeSignature } from "src/shared/lib/types";
import { tickToPosition } from "src/shared/lib/utils";

// export class Grid {
// 	constructor(
// 		width: number = 1,
// 		resolution: GridResolution = "1/4",
// 		signature: TimeSignature = "4/4",
// 	) {
// 		this.width = width;
// 		this.resolution = resolution;
// 		this.signature = signature;

// 		this.makeGridLayout();
// 	}
// 	width: number;
// 	resolution: GridResolution;
// 	signature: TimeSignature;
// 	gridLayout: GridLine[] = [];
// 	makeGridLayout(resolution = this.resolution, signature = this.signature) {
// 		const linesCount = SIGNATURE_TO_TICKS[signature] / TICK_IN_DURATION[resolution];
// 		const gridLines: GridLine[] = [...Array(linesCount)];

// 		for (let i = 0; i < gridLines.length; i++) {
// 			let tickNumber = i * TICK_IN_DURATION[resolution];
// 			let position = (tickNumber / SIGNATURE_TO_TICKS[signature]) * this.width;
// 			let weight: GridLineWeight = "light";

// 			if (tickNumber % TICKS_IN_EIGHTH === 0) weight = "medium";

// 			if (signature === "6/8") {
// 				if ((tickNumber % TICKS_IN_EIGHTH) * 3 === 0) weight = "bold";
// 			} else {
// 				if (tickNumber % TICKS_IN_QUARTER === 0) weight = "bold";
// 			}

// 			gridLines[i] = {
// 				weight,
// 				tickNumber,
// 				position,
// 			};
// 		}
// 		this.gridLayout = gridLines;

// 		return this.gridLayout;
// 	}

// 	setSignature(signature: TimeSignature) {
// 		this.signature = signature;
// 		this.makeGridLayout();
// 		return this;
// 	}

// 	setResolution(resolution: GridResolution) {
// 		this.resolution = resolution;
// 		this.makeGridLayout();
// 		return this;
// 	}

// 	setWidth(width: number) {
// 		this.width = width;
// 		this.makeGridLayout();
// 		return this;
// 	}

// }

export const makeGridStructure = (resolution: GridResolution, signature: TimeSignature = "4/4") => {
	const linesCount = SIGNATURE_TO_TICKS[signature] / DURATION_TO_TICKS[resolution];
	const gridLines: GridLine[] = [...Array(linesCount)];

	for (let i = 0; i < gridLines.length; i++) {
		let tickNumber = i * DURATION_TO_TICKS[resolution];
		let weight: GridLineWeight = "light";

		if (tickNumber % TICKS_IN_EIGHTH === 0) weight = "medium";

		if (signature === "6/8") {
			if (tickNumber % (TICKS_IN_EIGHTH * 3) === 0) weight = "bold";
		} else {
			if (tickNumber % TICKS_IN_QUARTER === 0) weight = "bold";
		}

		gridLines[i] = {
			weight,
			tickNumber,
		};
	}

	return gridLines;
};

export const drawGrid = (p: p5, grid: Grid) => {
	for (let line of grid.structure) {
		let linePosition =
			EDITOR_LEFT_PADDING +
			tickToPosition(line.tickNumber, grid.width - EDITOR_LEFT_PADDING, grid.signature);
		p.push();
		p.stroke(GRID_COLOR[line.weight]);
		p.strokeWeight(1);
		p.line(linePosition, 0, linePosition, p.height);
		p.pop();
	}
};
