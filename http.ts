/**
 * $http definition
 */

export interface RequestOptionsArgs {
	params?: string | any;
	data?: string | any;
	headers?: any;
	xsrfHeaderName?: string;
	xsrfCookieName?: string;
	transformRequest?: Function | Function[];
	transformResponse?: Function | Function[];
	paramSerializer?: string | Function;
	cache?: boolean | any;
	timeout?: number | Promise<any>;
	withCredentials?: boolean;
	responseType?: string;
}

export interface Response {
	data: string | any;
	status: number;
	headers: Function;
	config: RequestOptionsArgs;
	statusText: string;
}

export abstract class Http {
	// Angular 2.0
	abstract get(url: string, options?: RequestOptionsArgs): Promise<Response>;
	abstract post(url: string, body: any, options?: RequestOptionsArgs): Promise<Response>;
	abstract put(url: string, body: any, options?: RequestOptionsArgs): Promise<Response>;
	abstract delete(url: string, options?: RequestOptionsArgs): Promise<Response>;
	abstract patch(url: string, body: any, options?: RequestOptionsArgs): Promise<Response>;
	abstract head(url: string, options?: RequestOptionsArgs): Promise<Response>;

	// Angular 1.x
	abstract jsonp(url: string, options?: RequestOptionsArgs): Promise<Response>;
}

Object.defineProperty(Http, 'name', { value: '$http' });
