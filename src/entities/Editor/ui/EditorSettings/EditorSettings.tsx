import React from "react";
import { useAppDispatch, useAppSelector } from "src/shared/lib/hooks/reduxHooks";
import { selectEditorGrid } from "../../model/selectors";
import { setGridResolution, setSignature } from "../../model/slice/editorSlice";
import { GridResolution } from "../../model/types";
import { GRID_RESOLUTIONS, GRID_RESOLUTIONS_IN_TYPES } from "../../constants/grid";
import { SIGNATURE_VALUES } from "src/shared/lib/consts";
import { TimeSignature } from "src/shared/lib/types";

import styles from "./EditorSettings.module.scss";

const EditorSettings = () => {
	const dispatch = useAppDispatch();
	const { resolution, signature } = useAppSelector(selectEditorGrid);

	const handleResolutionSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const resolution = e.target.value as GridResolution;
		// console.log(resolution);
		dispatch(setGridResolution({ resolution }));
	};
	const handleSignatureSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const signature = e.target.value as TimeSignature;
		// console.log(signature);
		dispatch(setSignature({ signature }));
	};

	return (
		<div className={styles["_"]}>
			<label className={styles["_select"]}>
				Разрешение:
				<select
					name="gridResolution"
					id="gridResolution"
					onChange={handleResolutionSelect}
					value={resolution}
				>
					<optgroup label="Прямые длительности">
						{GRID_RESOLUTIONS_IN_TYPES.straight.map((resolution) => (
							<option key={resolution} value={resolution}>
								{resolution}
							</option>
						))}
					</optgroup>
					<optgroup label="Триольные длительности">
						{GRID_RESOLUTIONS_IN_TYPES.triplet.map((resolution) => (
							<option key={resolution} value={resolution}>
								{resolution}
							</option>
						))}
					</optgroup>
				</select>
			</label>

			<label className={styles["_select"]}>
				Размер:
				<select
					name="signature"
					id="signature"
					value={signature}
					onChange={handleSignatureSelect}
				>
					{SIGNATURE_VALUES.map((signature) => (
						<option key={signature} value={signature}>
							{signature}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};

export default EditorSettings;
