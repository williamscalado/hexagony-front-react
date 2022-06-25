import { Route, Routes } from "react-router-dom";
import App from "./App";
import { PageLogin } from "./pages/login";

export const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<App />}></Route>
				<Route path="/login" element={<PageLogin />}></Route>
			</Routes>
		</>
	);
};
