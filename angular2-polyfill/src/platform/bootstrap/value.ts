import {Injector} from '../../core/core';
import * as utils from './utils';

export function bootstrap(ngModule, target) {
	const annotations = target.__annotations__;
	const value = annotations.value;
	const name = value.name;

	let ret = value.value;

	if (annotations.multi === true) {
		const injector = angular.injector([ngModule.name]);
		const injectables = utils.getInjectables(injector, name) || [];

		if (!Array.isArray(injectables)) {
			throw new Error('You can not mix multi with single providers.');
		}

		injectables.push(ret);

		ret = injectables;
	}

	ngModule.value(name, ret);
	return name;
}
