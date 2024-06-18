import { GRID_COLOR } from "../../constants/grid";

export type GridLine = {
	weight: GridLineWeight;
	tickNumber: number;
};

export type GridLayout = {
	position: number;
	line: GridLine;
}[];

export type GridLineWeight = keyof typeof GRID_COLOR;
