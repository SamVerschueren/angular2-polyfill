declare const Reflect;

/**
 * Bind the inputs defined on the target to the directive.
 */
export function bind(target, directive) {
	const annotations = target.__annotations__;
	const component = annotations.component || annotations.directive;

	function toBinding(key, value) {
		const match = value.match(/^([@=<])?(.*)?$/);

		if (match[1]) {
			// signed inputs (<, @, =)
			return {
				key: match[2] || key,
				value: match[1] + (match[2] || key)
			}
		}

		let sign = '@';

		if (Reflect.hasMetadata('design:type', target.prototype, key)) {
			// If the type is not a primitive, use pass-by-reference
			const type = Reflect.getMetadata('design:type', target.prototype, key);

			if (type.name !== 'String' && type.name !== 'Number' && type.name !== 'Boolean') {
				sign = '=';
			}
		}

		return {
			key: key,
			value: sign + value
		};
	}

	// Bind all the elements in the `inputs` array
	(component.inputs || []).forEach(key => {
		const mapping = key.split(/:[ ]*/);
		const binding = toBinding(mapping[0], mapping[1] || mapping[0]);
		directive.bindToController[binding.key] = binding.value;
	});

	// Bind all the elements in the `@Input` annotation list
	Object.keys(annotations.inputs || {}).forEach(key => {
		const binding = toBinding(key, annotations.inputs[key]);
		directive.bindToController[binding.key] = binding.value;
	});
}
