import axios from "axios";
import { isAuth } from "../auth/authentication";

export const ApiAuth = axios.create({
	baseURL: "http://localhost:8000",
});

const Api = axios.create({
	baseURL: "http://localhost:8000",
});

Api.interceptors.request.use((req) => {
	if (isAuth()) {
		const token = localStorage.getItem('hegaxoniAuth') as string;
		req.headers = {
			...req.headers,
			'Authorization': `Bearer ${token}`
		}
	}

	return req;
});

export default Api;
