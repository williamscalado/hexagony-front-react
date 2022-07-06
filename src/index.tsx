import { ThemeProvider } from "@emotion/react";
import createTheme from "@mui/material/styles/createTheme";
import { ConfirmProvider } from "material-ui-confirm";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import reportWebVitals from "./reportWebVitals";
import { AppRoutes } from "./router";
import "./style/global.scss";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});
root.render(
	<RecoilRoot>
		<BrowserRouter>
			<ThemeProvider theme={darkTheme}>
				<ConfirmProvider>
					<React.StrictMode>
						<Toaster />
						<AppRoutes />
					</React.StrictMode>
				</ConfirmProvider>
			</ThemeProvider>
		</BrowserRouter>
	</RecoilRoot>
);

reportWebVitals();
