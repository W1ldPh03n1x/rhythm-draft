import React from "react";
import { PatternKind } from "../../model/types";
import styles from "./PatternLabel.module.css";

interface PartternLabelProps {
	type: PatternKind;
	index?: number;
	color?: [r: number, g: number, b: number];
	size?: "small" | "medium" | "large";
}

export const PatternLabel = ({ type, size = "medium", index, color }: PartternLabelProps) => {
	return (
		<div className={[styles._, styles[`size--${size}`]].join(" ")}>
			<span className={styles["_type"]}>{type === "rhythm" ? "Р" : "Б"}</span>
			<span className={styles["_index"]}>{index || ""}</span>
		</div>
	);
};
