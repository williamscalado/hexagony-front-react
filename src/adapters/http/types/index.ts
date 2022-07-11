export type methods =
	| "GET"
	| "HEAD"
	| "POST"
	| "PUT"
	| "DELETE"
	| "CONNECT"
	| "OPTIONS"
	| "TRACE"
	| "PATCH";

export interface IHTTPRequest {
	url?: string;
	method?: methods;
	headers?: any;
	params?: any;
	data?: any;
	external?: boolean;
}

export interface IHTTPRequestError {
	default?: string;
	noResponse?: string;
	network?: string;
}

export interface IHTTP {
	fetch({
		url,
		method,
		headers,
		data,
		params,
		external,
	}: IHTTPRequest): Promise<any>;
}
