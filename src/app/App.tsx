import React from "react";
import "./styles/App.css";
import "abcjs/abcjs-audio.css";
import ABCJS from "../pages/TestABCJS";

import AbcComponent from "../pages/TestABCJS/AbcComponent";
import { AbcDrumBar } from "../shared/lib/utils/abcDrumStrings";
import { OneBar } from "../entities/OneBar";
import P5Canvas from "../shared/ui/P5Canvas/P5Canvas";
import SketchRenderer from "../shared/ui/SketchRenderer/SketchRenderer";
import p5 from "p5";

const sketch = (p: p5) => {
	let x = 50;
	let y = 50;

	p.setup = function () {
		p.createCanvas(1000, 400);

		p.describe("A white circle moves randomly on a gray background.");
	};

	p.draw = function () {
		p.background(200);

		x += p.random(-1, 2);
		y += p.random(-1, 1);

		p.circle(x, y, 20);
	};
};

function App() {
	return (
		<div className="App">
			{/* <ABCJS abcString={abcString} /> */}
			{/* <ABCJS abcString={abc} /> */}
			{/* <ABCJS abcString={abcTest} /> */}
			{/* <OneBar.View bar={takaTakaSampleBar} /> */}
			{/* <OneBar.Audio bar={takaTakaSampleBar} /> */}
			{/* <P5Canvas /> */}
			<SketchRenderer sketch={sketch} />
		</div>
	);
}

export default App;
