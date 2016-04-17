let id = 0;
const prefix = 'ng2Multi';
const map = {};

function bootstrapMulti(fn, ngModule, name, target) {
	map[name] = map[name] || [];

	// Create a unique name
	let privateName = `${prefix}_${fn}_${name}_${++id}`;
	ngModule[fn](privateName, target);

	// Add the name as dependency to the eventual result
	map[name].push(privateName);

	// Create a factory with the original name that returns all the other factories
	ngModule.factory(name, [...map[name], (...args) => args]);
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
