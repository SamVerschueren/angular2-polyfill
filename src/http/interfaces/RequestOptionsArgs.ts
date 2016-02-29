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
