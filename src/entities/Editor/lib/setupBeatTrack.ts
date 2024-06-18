import p5 from "p5";

export const setupBeatTrack = (p: p5, width: number = 480) => {
	return p.createCanvas(width, 36);
};
export const drawBackGround = (p: p5) => {
	p.background(p.color(72));
};
