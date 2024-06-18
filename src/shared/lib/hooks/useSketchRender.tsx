import p5 from "p5";
import { useEffect, useRef, useState } from "react";
import { Sketch } from "../types";

export const useSketchRender = (sketch: Sketch) => {
	const ref = useRef(null);
	const [pSaved, setP] = useState<p5 | null>(new p5(sketch, ref.current!));

	useEffect(() => {
		// const p = ;
		// console.log("const p", p);
		// setP(p);
		console.log("p", pSaved);
		return pSaved?.remove;
	}, [pSaved]);

	let removeP = () => {
		console.log("removeP", pSaved);
		if (pSaved) {
			pSaved.remove();
		}
		setP(null);
	};
	return {
		rendererRef: ref,
		removeP,
		p: pSaved,
	};
};
