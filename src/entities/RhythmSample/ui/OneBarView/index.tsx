import React from "react";
import { AbcDrumBar } from "@shared/lib/utils/abcDrumStrings";
import { useDisplayAbc } from "../../../../shared/lib/hooks/useDisplayAbc";

const OneBarView = ({ bar }: { bar: AbcDrumBar }) => {
	console.log(bar.getAbcString());
	const { displayElement } = useDisplayAbc(bar.getAbcString());
	return (
		<div>
			<div ref={displayElement}></div>
		</div>
	);
};

export default OneBarView;
