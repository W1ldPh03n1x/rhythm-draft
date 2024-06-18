import React from "react";
import { selectEditorCurrentPattern } from "../../model/selectors";
import { useAppSelector } from "src/shared/lib/hooks/reduxHooks";
import { useAbcRender } from "src/shared/lib/hooks/useAbcRender";
import { makeDrumAbcHeader } from "src/shared/lib/utils";
import { selectSignature } from "../../model/selectors/selectSignature";

const PatternPreview = () => {
	const currentPattern = useAppSelector(selectEditorCurrentPattern);
	const signature = useAppSelector(selectSignature);
	const { visualRendererRef } = useAbcRender(
		makeDrumAbcHeader(signature || "4/4") + (currentPattern.abc || ""),
	);
	return <div ref={visualRendererRef}></div>;
};

export default PatternPreview;
