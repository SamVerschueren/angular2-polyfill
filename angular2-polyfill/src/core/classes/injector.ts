import * as camelcase from 'camelcase';
import {OpaqueToken} from '../classes/opaque_token';
import {toInjectorName} from '../../utils';

export class Injector {

	private _injector: ng.auto.IInjectorService;

	constructor() {
		this._injector = angular.element(document).injector();
	}

	get(token: any) {
		const name = toInjectorName(token);
		return this._injector.get(name);
	}

	getOptional(token: any) {
		try {
			const name = toInjectorName(token);
			return this._injector.get(name);
		} catch (err) {
			return null;
		}
	}
}
