import React from "react";
import "./styles/App.css";
import abcjs from "abcjs";
import "abcjs/abcjs-audio.css";
import ABCJS from "../pages/TestABCJS";
function App() {
	const abcString = `X:1
	Q:1/4=90
	L:1/16
	M:4/4
	K:perc middle=f,,,
	V:1
	[B,,,!style=x!^D,]B,,,!style=x!^D,B,,,   [D,,!style=x!^D,]z!style=x!^D,D,, [B,,,!style=x!^D,]B,,,!style=x!^D,B,,,[D,,!style=x!^D,]z!style=x!^D,D,,|[B,,,!style=x!^D,]B,,,^D,B,,,[D,,^D,]z^D,z[B,,,^C,^D,]z[B,,,^C,^D,]z[D,,^C,^D,]B,,,[^C,^D,]z|[B,,,^D,]B,,,^D,B,,,[D,,^D,]z^D,D,,[B,,,^D,]B,,,^D,B,,,[D,,^D,]z^D,D,,|[B,,,^D,]B,,,^D,B,,,[D,,^D,]z^D,z[B,,,^C,^D,]z[B,,,^C,^D,]z[D,,^C,^D,]B,,,[^C,^D,]z|
	`;
	return (
		<div className="App">
			<ABCJS abcString={abcString} />
		</div>
	);
}

export default App;
