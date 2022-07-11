import { decodeToken, isExpired } from "react-jwt";

const localName = "hegaxoniAuth";

interface IToken {
	id: string;
}

export const isTokenAuth = localStorage.getItem(localName);

const getToken = () => localStorage.getItem(localName);

export const setAuth = (token: string) => {
	if (!token) return;

	const isExpiredToken = isExpired(token);
	if (isExpiredToken) {
		logout();
		return;
	}

	localStorage.setItem(localName, token);
};

export const isAuth = () => {
	const token = getToken();

	if (!token) return;

	const isExpiredToken = isExpired(token);
	if (isExpiredToken) {
		logout();
		return;
	}

	return true;
};

export const verifyTokenValidate = () => {
	const token = getToken();
	if (!token) return;
	const isExpiredToken = isExpired(token);
	if (isExpiredToken) return true;

	return false;
};

export const getIdIsAuth = () => {
	const token = getToken();

	if (!token) return;

	const isExpiredToken = isExpired(token);
	if (isExpiredToken) {
		logout();
		return;
	}

	const tokenData = decodeToken<IToken>(token);

	return tokenData?.id;
};

export const logout = () => localStorage.removeItem(localName);
