import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import App from "./App";
import { isAuth } from "./auth/authentication";
import { PageLogin } from "./pages/login";

export const AppRoutes = () => {
	const ProtectRouter = () => {
		if (!isAuth()) {
			return <Navigate to="/login" replace />;
		}
		return <Outlet />;
	};
	return (
		<>
			<Routes>
				<Route path="/login" element={<PageLogin />}></Route>
				<Route element={<ProtectRouter />}>
					<Route path="/" element={<App />}></Route>
				</Route>
			</Routes>
		</>
	);
};
