import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { isAuth } from "./auth/authentication";
import { PageAlbum } from "./pages/album";
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
					<Route path="/" element={<PageAlbum />}></Route>
					<Route path="/album" element={<PageAlbum />}></Route>
					<Route path="/users" element={<PageAlbum />}></Route>
				</Route>
				<Route path="*" element={<PageLogin />}></Route>
			</Routes>
		</>
	);
};
