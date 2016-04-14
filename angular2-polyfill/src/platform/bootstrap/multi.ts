import * as utils from './utils';

let id = 0;
const prefix = 'ng2Multi';
const map = {
	factory: {},
	service: {},
	value: {}
};

function bootstrapMulti(fn, ngModule, name, target) {
	map[fn][name] = map[fn][name] || [];

	// Create a unique name
	let privateName = `${prefix}_${fn}_${name}_${++id}`;
	ngModule[fn](privateName, target);

	// Add the name as dependency to the eventual result
	map[fn][name].push(privateName);

	// Create a factory with the original name that returns all the other factories
	ngModule.factory(name, [...map[fn][name], (...args) => args]);
}

export function bootstrapMultiFactory(ngModule, name, target) {
	bootstrapMulti('factory', ngModule, name, target);
}

export function bootstrapMultiInjectable(ngModule, name, target) {
	bootstrapMulti('service', ngModule, name, target);
}

export function bootstrapMultiValue(ngModule, name, target) {
	bootstrapMulti('value', ngModule, name, target);
}
