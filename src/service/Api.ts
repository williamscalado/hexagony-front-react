import axios from "axios";
import { isAuth, isTokenAuth } from "../auth/authentication";

const Api = axios.create({
	baseURL: "localhots:8000",
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Content-Type": "application/json",
	},
	withCredentials: false,
});

Api.interceptors.request.use((req) => {
	if (isAuth()) {
		req.headers = {
			Authorization: `Bearer <${isTokenAuth}>`,
		};
	}

	return req;
});

export default Api;
