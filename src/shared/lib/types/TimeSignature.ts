type TimeSignature = {
	value: [1, 4] | [2, 4] | [3, 4] | [4, 4] | [5, 8] | [6, 8] | [7, 8];
	beatsPerBar: number;
	beatDuration: number;
	toString: () => TimeSignatureString;
};

type TimeSignatureString = "1/4" | "2/4" | "3/4" | "4/4" | "5/8" | "6/8" | "7/8";

class Signature implements TimeSignature {
	value: TimeSignature["value"];
	constructor(value: TimeSignatureString) {
		let [beatsPerBar, beatDuration] = value.split("/");
		this.value = [Number(beatsPerBar), Number(beatDuration)] as TimeSignature["value"];
	}
	get beatsPerBar() {
		return this.value[0];
	}
	get beatDuration() {
		return this.value[1];
	}
	toString() {
		return `${this.beatsPerBar}/${this.beatDuration}` as TimeSignatureString;
	}
}

export { Signature };
export type { TimeSignature, TimeSignatureString };
