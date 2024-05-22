import { useDisplayAbc } from "../../../../shared/lib/hooks/useDisplayAbc";
import { AbcDrumBar } from "@shared/lib/utils/abcDrumStrings";
import React from "react";

const View = ({ bar }: { bar: AbcDrumBar }) => {
	const { displayElement } = useDisplayAbc(bar.getAbcString());
	return (
		<div>
			<div className="BarView" ref={displayElement}></div>
		</div>
	);
};

export default View;
