import p5 from "p5";
import React, { useEffect, useLayoutEffect, useRef } from "react";

const SketchRenderer = ({
	sketch,
	width,
	height,
}: {
	sketch: (p: p5) => void;
	width: number;
	height: number;
}) => {
	const ref = useRef(null);

	useEffect(() => {
		const p5Instance = new p5(sketch, ref.current!);
		console.log(ref.current);
		return p5Instance.remove;
	}, [ref]);
	useLayoutEffect(() => {}, []);
	return <div className="sketch-renderer" ref={ref} id={"sketch-renderer"}></div>;
};

export default SketchRenderer;
