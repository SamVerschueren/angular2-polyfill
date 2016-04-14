import * as utils from './utils';
import {bootstrapMultiInjectable as bootstrapMulti} from './multi';

export function bootstrap(ngModule, target) {
	const annotations = target.__annotations__ || {};
	const injectable = annotations.injectable || {};

	// DI
	utils.inject(target);

	const name = injectable.name || target.name;

	if (annotations.multi === true) {
		bootstrapMulti(ngModule, name, target);
	} else {
		ngModule.service(name, target);
	}

	return name;
}
