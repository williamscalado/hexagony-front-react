import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { PageAbout } from "./components/About";
import { PageNotFound } from "./components/NotFound";
import { isAuth, verifyTokenValidate } from "./helpers/authentication";
import { PageAlbum } from "./modules/album/view";
import { PageLogin } from "./modules/auth/view";
import { UserPage } from "./modules/users/view";

export const AppRoutes = () => {
	const ProtectRouter = () => {
		if (!isAuth() || verifyTokenValidate()) {
			return <Navigate to="/login" replace />;
		}
		return <Outlet />;
	};

	return (
		<>
			<Routes>
				<Route path="/login" element={<PageLogin />}></Route>
				<Route element={(verifyTokenValidate(), (<ProtectRouter />))}>
					<Route path="/" element={<PageAlbum />}></Route>
					<Route path="/album" element={<PageAlbum />}></Route>
					<Route path="/users" element={<UserPage />}></Route>
					<Route path="/about" element={<PageAbout />}></Route>
				</Route>
				<Route path="*" element={<PageNotFound />}></Route>
			</Routes>
		</>
	);
};
