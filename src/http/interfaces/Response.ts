import {RequestOptionsArgs} from './RequestOptionsArgs';

export interface Response {
	data: string | any;
	status: number;
	headers: Function;
	config: RequestOptionsArgs;
	statusText: string;
}
