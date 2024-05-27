import p5 from "p5";
import React, { useEffect, useRef } from "react";

const SketchRenderer = ({ sketch }: { sketch: (p: p5) => void }) => {
	const ref = useRef(null);
	useEffect(() => {
		const p5Instance = new p5(sketch, ref.current!);
		return p5Instance.remove;
	}, [ref]);
	return <div className="sketch-renderer" ref={ref} id={"sketch-renderer"}></div>;
};

export default SketchRenderer;
