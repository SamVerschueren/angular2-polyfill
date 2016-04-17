declare const Reflect;

export function bind(target, directive) {
	const annotations = target.__annotations__;
	const component = annotations.component || annotations.directive;

	function signOf(key) {
		if (Reflect.hasMetadata('design:type', target.prototype, key)) {
			const type = Reflect.getMetadata('design:type', target.prototype, key);

			if (type.name === 'String' || type.name === 'Number' || type.name === 'Boolean') {
				return '@';
			} else {
				return '=';
			}
		}

		return '@';
	}

	// Bind all the elements in the `inputs` array
	(component.inputs || []).forEach(key => {
		const mapping = key.split(/:[ ]*/);
		directive.bindToController[mapping[0]] = signOf(key) + (mapping[1] || mapping[0]);
	});

	// Bind all the elements in the `@Input` annotation list
	Object.keys(annotations.inputs || {}).forEach(key => {
		directive.bindToController[key] = signOf(key) + annotations.inputs[key];
	});
}
