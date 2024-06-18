import React, { useEffect, useState } from "react";
import { DrumName, DrumType } from "src/shared/lib/types/Drums";
import { DRUM_KIT, DRUM_NAMES } from "src/shared/lib/consts";
import BeatTrack from "../BeatTrack/BeatTrack";
import { useAppSelector } from "src/shared/lib/hooks/reduxHooks";
import {
	selectEditorDrumTracks,
	selectEditorGrid,
	selectEditorSignature,
} from "../../model/selectors";
import styles from "./DrumLine.module.scss";
import DrumLineLabel from "../DrumLineLabel/DrumLineLabel";

export interface DrumLineProps {
	drumName: DrumName;
	trackNames: DrumType[];
}

const DrumLine = ({ drumName, trackNames }: DrumLineProps) => {
	const drumTracks = useAppSelector(selectEditorDrumTracks);
	const grid = useAppSelector(selectEditorGrid);

	const [folded, setFolded] = useState(true);
	const multiple = DRUM_KIT[drumName].length > 1;

	// console.log("DrumLine render", drumName, trackNames, drumTracks);
	let beats: number[] = [];
	for (let drumType of DRUM_KIT[drumName]) {
		if (drumTracks[drumType].length !== 0) {
			beats = [...beats, ...drumTracks[drumType]];
			// console.log(drumType, beats);
		}
	}

	const toggleFold = () => {
		setFolded(!folded);
	};

	return (
		<div
			className={[styles["_container"], !folded ? styles["_container--open"] : ""].join(" ")}
		>
			<div className={styles["_"]}>
				<DrumLineLabel
					drumName={drumName}
					drumType={trackNames[0]}
					folded={folded}
					toggleFold={toggleFold}
					multiple={multiple}
				/>
				<BeatTrack drum={trackNames[0]} beats={folded ? beats : []} grid={grid} />
			</div>
			{multiple &&
				!folded &&
				trackNames.map((drumType) => (
					<div className={styles["_"]} key={drumType}>
						<DrumLineLabel drumName={drumName} drumType={drumType} trackType="mod" />
						<BeatTrack beats={drumTracks[drumType]} drum={drumType} grid={grid} />
					</div>
				))}
		</div>
	);
};

export default DrumLine;
