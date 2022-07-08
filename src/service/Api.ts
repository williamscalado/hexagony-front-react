import axios from "axios";
import { isAuth, verifyTokenValidate } from "../helpers/authentication";

export const ApiAuth = axios.create({
	baseURL: "https://hexagony.herokuapp.com",
});

const Api = axios.create({
	baseURL: "https://hexagony.herokuapp.com",
});

Api.interceptors.request.use((req) => {
	if (isAuth()) {
		verifyTokenValidate();
		const token = localStorage.getItem("hegaxoniAuth") as string;
		req.headers = {
			...req.headers,
			Authorization: `Bearer ${token}`,
		};
	}

	return req;
});

export default Api;
