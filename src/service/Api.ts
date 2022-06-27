import axios from "axios";

export const Api = axios.create({
	baseURL: "localhots:8000",
});
