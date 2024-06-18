import React, { useEffect, useRef, useState } from "react";
import { Grid, GridLayout } from "../model/types";
import p5 from "p5";
import { createBeatTrackSketch } from "../lib/sketch";
import { DrumType } from "src/shared/lib/types";
import { selectEditorDrumTracks, selectEditorGrid } from "../model/selectors";
import { useAppSelector } from "src/shared/lib/hooks/reduxHooks";

const useBeatTrack = (drum: DrumType, beats: number[], grid: Grid) => {
	const trackRef = useRef<HTMLDivElement>(null);
	const [p, setP] = useState<p5 | null>(null);

	useEffect(() => {
		if (p) p.remove();
		if (!trackRef.current) return;
		if (!beats) return;

		// console.log("reRender p:", drum, beats);
		console.log(grid);
		setP(new p5(createBeatTrackSketch(beats, grid), trackRef.current!));
		return p?.remove;
	}, [beats, grid]);

	return { trackRef };
};

export default useBeatTrack;
