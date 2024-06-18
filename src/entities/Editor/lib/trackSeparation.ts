import p5 from "p5";

export const drawTrackSeparation = (p: p5) => {
	p.push();
	p.strokeWeight(1);
	p.stroke(31);
	// p.line(0, 0, p.width, 0);
	p.line(0, p.height, p.width, p.height);
	p.pop();
};
