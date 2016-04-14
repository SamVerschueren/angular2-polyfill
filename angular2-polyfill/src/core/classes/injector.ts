import * as camelcase from 'camelcase';
import {OpaqueToken} from '../classes/opaque_token';
import {toInjectorName} from '../../utils';

export class Injector {

	private _module: ng.IModule;
	private _injector: ng.auto.IInjectorService;

	constructor(module: ng.IModule) {
		this._module = module;
		this._injector = angular.injector(['ng', module.name]);
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
