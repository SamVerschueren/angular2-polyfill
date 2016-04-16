import {Observable} from 'rxjs';
import {Inject} from '../../core';
import {RequestOptionsArgs} from './interfaces/RequestOptionsArgs';
import {Response} from './interfaces/Response';

export class Http {

	// Inject good old `$http`
	constructor(@Inject('$http') private http) {

	}

	// // TODO IMPLEMENT
	// request(url: string | Request, options?: RequestOptionsArgs): Promise<Response> {
	//
	// }

	get(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return Observable.fromPromise<Response>(this.http.get(url, options));
	}

	post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		return Observable.fromPromise<Response>(this.http.post(url, body, options));
	}

	put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		return Observable.fromPromise<Response>(this.http.put(url, body, options));
	}

	delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return Observable.fromPromise<Response>(this.http.delete(url, options));
	}

	patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
		return Observable.fromPromise<Response>(this.http.patch(url, body, options));
	}

	head(url: string, options?: RequestOptionsArgs): Observable<Response> {
		return Observable.fromPromise<Response>(this.http.head(url, options));
	}
}
