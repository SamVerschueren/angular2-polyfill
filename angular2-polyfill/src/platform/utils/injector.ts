declare const Reflect;

/**
 * Creates a factory with the name `@Optional({injectable})` which checks
 * if the injectable exists or not. If the injectable exists, the factory
 * will return the injectable, if not, it will return `null`.
 *
 * @param {ng.IModule}	ngModule	The root module.
 * @param {string}		injectable	The name of the optional injectable.
 * @returns {string}				The name of the factory.
 */
function createOptionalInject(ngModule: ng.IModule, injectable: string) {
	const name = `@Optional(${injectable})`;

	const factory = $injector => {
		if ($injector.has(injectable)) {
			return $injector.get(injectable);
		}

		return null;
	};

	factory.$inject = ['$injector'];

	// Create the factory
	ngModule.factory(name, factory);

	return name;
}

export function inject(ngModule: ng.IModule, target) {
	const annotations = target.__annotations__ || {};
	const injectables = [];

	if (annotations.inject) {
		annotations.inject.forEach((injectable, index) => {
			let name = typeof injectable === 'string' ? injectable : injectable.name;

			if (annotations.optional && annotations.optional[index] === true) {
				// If the injectable is optional, replace the name with the optional injector
				name = createOptionalInject(ngModule, name);
			}

			injectables[index] = name;
		});
	}

	if (Reflect.hasMetadata('design:paramtypes', target)) {
		Reflect.getMetadata('design:paramtypes', target).forEach((type, index) => {
			if (type.name !== 'Object' && injectables[index] === undefined) {
				let name = type.name;

				if (annotations.optional && annotations.optional[index] === true) {
					// If the injectable is optional, replace the name with the optional injector
					name = createOptionalInject(ngModule, name);
				}

				injectables[index] = name;
			}
		});
	}

	target.$inject = injectables;
}
