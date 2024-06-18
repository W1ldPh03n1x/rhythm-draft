import "abcjs/abcjs-audio.css";

import styles from "./App.module.css";
import SongPage from "src/pages/SongPage/ui/SongPage";

function App() {
	return (
		<div className={styles["_"]}>
			<SongPage />
		</div>
	);
}

export default App;
