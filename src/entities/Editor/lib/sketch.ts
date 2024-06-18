import p5 from "p5";
import {
	drawBackGround,
	drawBeatIcon,
	drawBeats,
	drawGrid,
	drawTrackSeparation,
	setupBeatTrack,
} from "./index";
import { Grid, GridLayout } from "../model/types";
import { DrumType, Sketch, TimeSignature } from "src/shared/lib/types";
import { findNearestLine, positionToTick, tickToPosition } from "src/shared/lib/utils";
import { EDITOR_LEFT_PADDING } from "../constants";

export const createSketch = ({ setup, draw }: { setup: () => void; draw: () => void }) => {
	return (p: p5) => {
		p.setup = setup || (() => {});
		p.draw = draw || (() => {});
	};
};

export const mouseOverSketch = (p: p5) =>
	p.mouseX > 0 && p.mouseX <= p.width && p.mouseY > 0 && p.mouseY <= p.height;

const createGridGraphics = (p: p5, grid: Grid) => {
	const g = p.createGraphics(p.width, p.height);
	g.noCanvas();
	drawBackGround(g);
	drawTrackSeparation(g);
	drawGrid(g, grid);
	return g;
};

export const createBeatTrackSketch = (beats: number[], grid: Grid): Sketch => {
	const sketch = function (p: p5) {
		let sketchBeats = [...beats];
		let sketchGrid = grid;
		let g: p5.Graphics;
		if (p) {
			p.setup = () => {
				setupBeatTrack(p, grid.width);
				g = createGridGraphics(p, grid);
			};

			p.draw = () => {
				p.clear();
				p.image(g, 0, 0);

				drawBeats(p, sketchBeats, sketchGrid.signature);

				let bindingPosition = 0;

				if (mouseOverSketch(p)) {
					bindingPosition =
						tickToPosition(
							findNearestLine(p.mouseX - EDITOR_LEFT_PADDING, sketchGrid).tickNumber,
							grid.width - EDITOR_LEFT_PADDING,
							grid.signature,
						) + EDITOR_LEFT_PADDING;
					drawBeatIcon(p, bindingPosition, "binding");
				}
			};
		}
	};
	return sketch;
};

export const sketchBeatTrack = (beats: number[], grid: Grid, drum: DrumType) => {
	return function (p: p5) {
		p.setup = () => {};
		p.draw = () => {};
	};
};
