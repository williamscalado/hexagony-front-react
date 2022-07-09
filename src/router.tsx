import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { isAuth, verifyTokenValidate } from "./helpers/authentication";
import { PageAbout } from "./modules/about/view";
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
					<Route
						path="/"
						element={(verifyTokenValidate(), (<PageAlbum />))}
					></Route>
					<Route
						path="/album"
						element={(verifyTokenValidate(), (<PageAlbum />))}
					></Route>
					<Route
						path="/users"
						element={(verifyTokenValidate(), (<UserPage />))}
					></Route>
					<Route
						path="/about"
						element={(verifyTokenValidate(), (<PageAbout />))}
					></Route>
				</Route>
				<Route path="*" element={<PageLogin />}></Route>
			</Routes>
		</>
	);
};
