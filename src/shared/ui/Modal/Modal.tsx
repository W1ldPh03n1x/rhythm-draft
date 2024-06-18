import React from "react";
import styles from "./Modal.module.css";

export interface ModalProps {
	show: boolean;
}

const Modal = ({ show = false }: ModalProps) => {
	return <div className={styles["_wrapper"]}>Modal</div>;
};

export default Modal;
