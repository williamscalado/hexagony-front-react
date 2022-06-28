import { isExpired } from "react-jwt";

const localName = "hegaxoniAuth";

export const isTokenAuth = localStorage.getItem(localName) || "";

const getToken = () => localStorage.getItem(localName) || "";

export const setAuth = async (token: string) => {
	if (!token) return;

	const isExpiredToken = isExpired(token);
	console.log(isExpiredToken);
	if (isExpiredToken) {
		logout();
		return;
	}

	localStorage.setItem(localName, token);
};
export const isAuth = () => {
	const token = getToken();
	console.log(token);
	if (!token) return;

	const isExpiredToken = isExpired(token);
	if (isExpiredToken) {
		logout();
		return;
	}

	return true;
};

const logout = () => localStorage.removeItem(localName);
