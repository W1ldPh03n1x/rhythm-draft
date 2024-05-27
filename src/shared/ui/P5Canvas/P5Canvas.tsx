import P5 from "p5";
import React, { useEffect, useRef, useState } from "react";

const sketch = (p: P5) => {
	// Create the sketch's variables within its scope.
	let x = 50;
	let y = 50;

	// Declare the setup() method.
	p.setup = function () {
		p.createCanvas(100, 100);

		p.describe("A white circle moves randomly on a gray background.");
	};

	// Declare the draw() method.
	p.draw = function () {
		p.background(200);

		// Update x and y.
		x += p.random(-1, 1);
		y += p.random(-1, 1);

		// Draw the circle.
		p.circle(x, y, 20);
	};
};

// const P5Canvas = ({ sketch }: { sketch: (p: any) => void }) => {
const P5Canvas = () => {
	const canvasRef = useRef(null);
	const [ref, setRef] = useState(canvasRef);
	useEffect(() => {
		const p5 = new P5(sketch, ref.current!);
		return p5.remove;
	}, [ref]);
	useEffect(() => {
		setRef(canvasRef);
	}, [canvasRef]);
	return <div ref={canvasRef}></div>;
};

export default P5Canvas;
