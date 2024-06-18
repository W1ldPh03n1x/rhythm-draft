import React, { useEffect } from "react";
import styles from "./PatternEditor.module.scss";
import { DRUM_KIT, DRUM_TYPES_IN_ORDER } from "src/shared/lib/consts";
import { DrumLine } from "../index";
import { useAppDispatch, useAppSelector } from "src/shared/lib/hooks/reduxHooks";
import { selectEditorDrumTracks } from "../../model/selectors";
import { DrumName } from "src/shared/lib/types";
import { setGridWidth } from "../../model/slice/editorSlice";

const PatternEditor = () => {
	const dispatch = useAppDispatch();
	// useEffect(() => {
	// 	dispatch(setGridWidth({ width: 720 }));
	// }, []);
	return (
		<div className={styles["_"]}>
			{Object.keys(DRUM_KIT).map((drumName) => (
				<DrumLine
					key={drumName}
					drumName={drumName as DrumName}
					trackNames={DRUM_KIT[drumName as DrumName]}
				/>
			))}
			{/* <DrumLine key={"as"} drumName={"Kick"} trackNames={DRUM_KIT["Kick"]} /> */}
		</div>
	);
};

export default PatternEditor;
