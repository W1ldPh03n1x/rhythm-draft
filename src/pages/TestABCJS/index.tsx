import abcjs, { AbcVisualParams } from "abcjs";
import { useEffect, useRef, useState } from "react";

const TestABCJS = ({ abcString }: { abcString: string }) => {
	const [abcTune, setAbcTune] = useState(abcString);
	const inputEl = useRef(null);

	useEffect(() => {
		if (inputEl.current)
			// @ts-ignore
			abcjs.renderAbc(inputEl.current, abcTune, {
				add_classes: true,
				responsive: "resize",
			});
	}, [abcTune]);

	useEffect(() => {
		setAbcTune(abcString);
	}, [abcString]);

	return (
		<div>
			<div ref={inputEl}></div>
		</div>
	);
};

export default TestABCJS;
