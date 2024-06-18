import { TimeSignature } from "src/shared/lib/types/TimeSignature";
import { DrumType } from "src/shared/lib/types";
import { Grid } from "../../model/types";
import useBeatTrack from "../../hooks/useBeatTrack";
import styles from "./BeatTrack.module.scss";

export interface BeatTrackProps {
	beats: number[];
	drum: DrumType;
	grid: Grid;
}

const BeatTrack = ({ beats = [], drum, grid }: BeatTrackProps) => {
	const { trackRef } = useBeatTrack(drum, beats, grid);
	return <div ref={trackRef} className={styles._}></div>;
};

export default BeatTrack;
