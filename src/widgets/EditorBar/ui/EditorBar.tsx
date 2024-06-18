import React from "react";
import { EditorSettings, PatternEditor, PatternPreview } from "src/entities/Editor/ui";
import styles from "./EditorBar.module.scss";

export const EditorBar = () => {
	return (
		<div className={styles["_"]}>
			<div className={styles["_header"]}>
				<EditorSettings />
			</div>
			<div className={styles["_main"]}>
				<PatternEditor />
				{/* <PatternPreview /> */}
			</div>
		</div>
	);
};
