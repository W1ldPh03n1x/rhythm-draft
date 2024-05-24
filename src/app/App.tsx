import React from "react";
import "./styles/App.css";
import "abcjs/abcjs-audio.css";
import ABCJS from "../pages/TestABCJS";

import AbcComponent from "../pages/TestABCJS/AbcComponent";
import { AbcDrumBar } from "../shared/lib/utils/abcDrumStrings";
import { OneBar } from "../entities/OneBar";

function App() {
	return (
		<div className="App">
			{/* <ABCJS abcString={abcString} /> */}
			{/* <ABCJS abcString={abc} /> */}
			{/* <ABCJS abcString={abcTest} /> */}
			{/* <OneBar.View bar={takaTakaSampleBar} /> */}
			{/* <OneBar.Audio bar={takaTakaSampleBar} /> */}
		</div>
	);
}

export default App;
