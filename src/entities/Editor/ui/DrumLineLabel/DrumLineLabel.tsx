import React from "react";
import { DrumName, DrumType } from "src/shared/lib/types";

import styles from "./DrumLineLabel.module.scss";
import { DRUM_MODS, DRUM_NAMES } from "src/shared/lib/consts";

export interface DrumLineLabelProps {
	drumName: DrumName;
	drumType: DrumType;
	trackType?: "master" | "mod";
	folded?: boolean;
	toggleFold?: () => void;
	multiple?: boolean;
}

const DrumLineLabel = ({
	drumName,
	drumType,
	toggleFold,
	folded = true,
	trackType = "master",
	multiple = false,
}: DrumLineLabelProps) => {
	return (
		<div className={[styles._, styles[`${trackType}`], !folded ? styles.open : ""].join(" ")}>
			<span className={styles["_name"]}>
				{trackType === "master" ? DRUM_NAMES[drumName] : DRUM_MODS[drumType]}
			</span>
			{multiple && (
				<div className={styles["_fold-toggle"]}>
					<button className={styles["_fold-toggle__button"]} onClick={toggleFold}>
						<span className={styles["_fold-toggle__arrow"]}>»</span>
					</button>
				</div>
			)}
		</div>
	);
};

export default DrumLineLabel;
