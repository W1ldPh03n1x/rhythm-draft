import { TimeSignature } from "../types";

export const getTimeSignatureComponents = (signature: TimeSignature) =>
	signature.split("/").map(Number);
