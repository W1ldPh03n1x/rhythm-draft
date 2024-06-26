import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/ui/App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReactReduxProvider } from "react-redux";
import { store } from "src/shared/lib/store";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<ReactReduxProvider store={store}>
		{/* <React.StrictMode> */}
		<App />
		{/* </React.StrictMode> */}
	</ReactReduxProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
