import React, { useEffect, useState, useRef } from "react";
import abcjs from "abcjs";

export default function Abc({ abc }) {
	const [abcTune, setAbcTune] = useState(abc);
	const inputEl = useRef(null);

	useEffect(() => {
		inputEl &&
			abcjs.renderAbc(inputEl.current, abcTune, {
				add_classes: true,
				responsive: "resize",
				generateDownload: true,
			});
	}, [abcTune]);

	useEffect(() => {
		setAbcTune(abc);
	}, [abc]);

	return (
		<div>
			<div ref={inputEl}></div>
		</div>
	);
}
