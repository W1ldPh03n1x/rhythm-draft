import React from "react";
import styles from "./SongPage.module.css";
import { EditorBar, PatternList, SongStructure } from "src/widgets";

const SongPage = () => {
	return (
		<div className={styles["_"]}>
			<SongStructure />
			<PatternList />
			<EditorBar />
		</div>
	);
};

export default SongPage;
