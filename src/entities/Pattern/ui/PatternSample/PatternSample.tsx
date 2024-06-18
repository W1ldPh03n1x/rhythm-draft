import React from "react";
import { DrumPattern } from "../../model/types";
import { useAbcRender } from "src/shared/lib/hooks/useAbcRender";
import { PatternLabel } from "../Label";
import styles from "./PatternSlample.module.css";
import { useAppDispatch } from "src/shared/lib/hooks/reduxHooks";
import { setCurrentPattern } from "src/entities/Editor/model/slice/editorSlice";

export const PatternSample = ({ pattern }: { pattern: DrumPattern }) => {
	const abcString = pattern.getAbcString({ alias: true, mapping: true, signature: true });
	// console.log(abcString);
	const { soundRendererRef, visualRendererRef } = useAbcRender(abcString, {
		// withSound: true,
		synthVisualOptions: {
			displayLoop: true,
			displayRestart: true,
			displayPlay: true,
			displayProgress: true,
			displayWarp: false,
		},
	});
	const dispatch = useAppDispatch();
	const handlePatternEdit = () => {
		dispatch(setCurrentPattern({ pattern }));
	};
	return (
		<div className={styles["_"]}>
			<PatternLabel type={pattern.type} size="small" index={pattern.index || undefined} />
			<button className={styles["_edit-button"]} onClick={handlePatternEdit}>
				Edit
			</button>
			<div className={styles["_sound"]} ref={soundRendererRef}></div>
			<div className={styles["_picture"]} ref={visualRendererRef}></div>
		</div>
	);
};
