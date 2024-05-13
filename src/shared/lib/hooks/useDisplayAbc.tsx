import { useEffect, useRef, useState } from "react";
import { AbcVisualParams, renderAbc } from "abcjs";

export const useDisplayAbc = (
	abcString: string,
	visualParams: AbcVisualParams = {
		staffwidth: 320,
		paddingtop: -4,
		paddingbottom: 2,
		paddingright: 8,
		paddingleft: 8,
		add_classes: true,
		responsive: "resize",
	},
) => {
	const [abcTune, setAbcTune] = useState(abcString);
	const displayElement = useRef(null);

	useEffect(() => {
		console.log(renderAbc(displayElement.current!, abcTune, visualParams));
	}, [abcTune]);

	useEffect(() => {
		setAbcTune(abcString);
	}, [abcString]);

	return {
		displayElement,
	};
};
