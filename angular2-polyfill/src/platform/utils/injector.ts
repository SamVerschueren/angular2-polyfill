declare const Reflect;

export function inject(ngModule: ng.IModule, target) {
	const annotations = target.__annotations__ || {};
	const injectables = [];

	if (annotations.inject) {
		annotations.inject.forEach((injectable, index) => {
			let name = typeof injectable === 'string' ? injectable : injectable.name;

			injectables[index] = name;
		});
	}

	if (Reflect.hasMetadata('design:paramtypes', target)) {
		Reflect.getMetadata('design:paramtypes', target).forEach((type, index) => {
			if (type.name !== 'Object' && injectables[index] === undefined) {
				let name = type.name;

				injectables[index] = name;
			}
		});
	}

	target.$inject = injectables;
}
