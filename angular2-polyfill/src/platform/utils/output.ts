/**
 * Creates a property with the name of the key provided to the target
 * prototype. Whenever a binding with that name is set, the `set` method of
 * that property is called and we can hook into the internals. This way we can also
 * handle event emitters.
 */
function attachPropertyHook(scope, target, key, name) {
	const wrapper = `__${name}Fn`;

	Object.defineProperty(target.prototype, key, {
		enumerable: true,
		configurable: true,
		get: function () {
			return this[`_${name}`];
		},
		set: function (value) {
			if (this[wrapper] === undefined) {
				// Catch the `<any foo="$ctrl.listener($event)" />` setter
				this[wrapper] = value;
			}

			if (typeof value === 'function') {
				// If it is a function, the result is just the wrapper function
				this[`_${name}`] = this[wrapper];
			} else if (value && value.emit && value.subscribe) {
				// It's an EventEmitter
				this[`_${name}`] = value;
				value.subscribe(e => {
					scope.$apply(() => {
						this[wrapper]({$event: e});
					});
				});
			}
		}
	});
}

export function bind(scope, target, directive) {
	const annotations = target.__annotations__;
	const component = annotations.component || annotations.directive;

	// Bind all the elements in the `outputs` array
	(component.outputs || []).forEach(key => {
		const mapping = key.split(/:[ ]*/);
		const name = mapping[1] || mapping[0];

		attachPropertyHook(scope, target, key, name);
		directive.bindToController[mapping[0]] = `&${name}`;
	});

	// Bind all the `@Output` annotations
	Object.keys(annotations.outputs || {}).forEach(key => {
		const name = annotations.outputs[key];

		attachPropertyHook(scope, target, key, name);
		directive.bindToController[key] = `&${name}`;
	});
}
