import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { isAuth, verifyTokenValidate } from "./helpers/authentication";
import { PageAlbum } from "./modules/album/view";
import { PageLogin } from "./modules/auth/view";
import { UserPage } from "./modules/users/view";

export const AppRoutes = () => {
	const ProtectRouter = () => {
		verifyTokenValidate();
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
					<Route path="/" element={<PageAlbum />}></Route>
					<Route path="/album" element={<PageAlbum />}></Route>
					<Route path="/users" element={<UserPage />}></Route>
				</Route>
				<Route path="*" element={<PageLogin />}></Route>
			</Routes>
		</>
	);
};
