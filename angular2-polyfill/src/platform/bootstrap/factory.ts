import * as utils from './utils';

function bootstrapMulti(ngModule, name, target) {
	let injector = angular.injector(['ng', ngModule.name]);
	let injectables = utils.getInjectables(injector, name) || [];

	if (!Array.isArray(injectables)) {
		throw new Error('You can not mix multi with single providers.');
	}

	// Create an injectable
	const injectable = injector.invoke(target);

	// Add the injectable to the list of injectables
	injectables.push(injectable);

	ngModule.value(name, injectables);
}

export function bootstrap(ngModule, target) {
	const annotations = target.__annotations__;
	const factory = annotations.factory;

	utils.inject(target);

	const name = factory.name || target.name;

	if (annotations.multi === true) {
		bootstrapMulti(ngModule, name, target);
	} else {
		ngModule.factory(name, target);
	}

	return name;
}
