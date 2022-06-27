import { decodeToken, isExpired } from "react-jwt";

const localName = "hegaxoniAuth";

export const isTokenAuth = localStorage.getItem(localName) || "";

export const setAuth = (token: string) => {
	if (!token) return;

	const decodedToken = decodeToken(token);
	const isExpiredToken = isExpired(token);
	if (!decodedToken || isExpiredToken) {
		logout();
		return;
	}

	localStorage.setItem(localName, token);
};
export const isAuth = () => {
	const token = isTokenAuth;
	if (!token) return;

	const isExpiredToken = isExpired(token);
	if (isExpiredToken) {
		logout();
		return;
	}

	return true;
};

const logout = () => localStorage.removeItem(localName);
