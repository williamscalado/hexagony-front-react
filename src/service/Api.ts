import axios from "axios";
import { isAuth, isTokenAuth } from "../auth/authentication";

const Api = axios.create({
	baseURL: "http://localhost:8000",
});

Api.interceptors.request.use((req) => {
	if (isAuth()) {
		req.headers = {
			...req.headers,
			Authorization: `Bearer ${isTokenAuth}`,
		};
	}

	return req;
});

export default Api;
