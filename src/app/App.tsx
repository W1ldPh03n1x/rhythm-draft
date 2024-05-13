import React from "react";
import "./styles/App.css";
import "abcjs/abcjs-audio.css";
import ABCJS from "../pages/TestABCJS";

import AbcComponent from "../pages/TestABCJS/AbcComponent";
import { AbcDrumBar, composeAbcDrumPart } from "../shared/lib/utils/abcDrumStrings";
import { OneBarAudio, OneBarView } from "../entities/RhythmSample/";

function App() {
	const abcString = `X:1
Q:1/4=90
L:1/16
M:4/4
K:perc middle=f,,,
V:1
[B,,,!style=x!^D,]B,,,!style=x!^D,B,,,   [D,,!style=x!^D,]2!style=x!^D,D,, [B,,,!style=x!^D,]B,,,!style=x!^D,B,,, [D,,!style=x!^D,]2!style=x!^D,D,,|
[B,,,!style=x!^D,]B,,,^D,B,,,[D,,^D,]z^D,z[B,,,^C,^D,]z[B,,,^C,^D,]z[D,,^C,^D,]B,,,[^C,^D,]z|[B,,,^D,]B,,,^D,B,,,[D,,^D,]z^D,D,,[B,,,^D,]B,,,^D,B,,,[D,,^D,]z^D,D,,|[B,,,^D,]B,,,^D,B,,,[D,,^D,]z^D,z[B,,,^C,^D,]z[B,,,^C,^D,]z[D,,^C,^D,]B,,,[^C,^D,]z|
`;

	const abc =
		"T: Cooley's\n" +
		"M: 4/4\n" +
		"L: 1/8\n" +
		"R: reel\n" +
		"K: Emin\n" +
		"|:D2|EB{c}BA B2 EB|~B2 AB dBAG|FDAD BDAD|FDAD dAFD|\n" +
		"EBBA B2 EB|B2 AB defg|afe^c dBAF|DEFD E2:|\n" +
		"|:gf|eB B2 efge|eB B2 gedB|A2 FA DAFA|A2 FA defg|\n" +
		"eB B2 eBgB|eB B2 defg|afe^c dBAF|DEFD E2:|";

	const abcTest =
		"L: 1/16\n" +
		"K: perc \n" +
		'[!style=x!aF]2[!style=x!gc]2 !style=x!gF!style=x!g2 !style=x!gF[!style=x!gF]2 z4|[!style=x!gF]!style=x!g!style=x!gc ggg[gF] g[gF][gF]g z4|\n[gF]ggc ggg[gF] g[gF][gF]g z4|"^>"c"@-8,-16(""@12,-16)"e"@-8,-16(""@12,-16)"e"^>"c z2e2 zd3 z4';
	const takaTakaSampleBar = new AbcDrumBar(
		'[Q: ][XgF]X^g [X^gc]X^g/"@-8,-16(""@12,-16)"c/ X^g/"@-8,-16(""@12,-16)"c/[X^gF] [X^gc]X^g',
	);

	return (
		<div className="App">
			{/* <ABCJS abcString={abcString} /> */}
			{/* <ABCJS abcString={abc} /> */}
			{/* <ABCJS abcString={abcTest} /> */}
			<OneBarView bar={takaTakaSampleBar} />
			<OneBarAudio bar={takaTakaSampleBar} />
		</div>
	);
}

export default App;
