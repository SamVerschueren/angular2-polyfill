import * as utils from './utils';

function bootstrapMulti(ngModule, name, target) {
	const injector = angular.injector([ngModule.name]);
	const injectables = utils.getInjectables(injector, name) || [];

	if (!Array.isArray(injectables)) {
		throw new Error('You can not mix multi with single providers.');
	}

	// Create an injectable
	const injectable = injector.instantiate(target);

	// Add the injectable to the list of injectables
	injectables.push(injectable);

	ngModule.value(name, injectables);
}

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
