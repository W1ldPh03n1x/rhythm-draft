import { useAppDispatch, useAppSelector } from "src/shared/lib/hooks/reduxHooks";
import React, { useEffect } from "react";
import { selectPatternList } from "src/entities/Pattern/model/selectors";
import { PatternSample } from "src/entities/Pattern";
import styles from "./PatternList.module.css";

export const PatternList = () => {
	const list = useAppSelector(selectPatternList);

	console.log(list);
	return (
		<div className={styles["_"]}>
			{list.map((pattern) => (
				<PatternSample key={pattern.id} pattern={pattern} />
			))}
		</div>
	);
};
