export function bind(target, directive) {
	const annotations = target.__annotations__;
	const component = annotations.component || annotations.directive;

	// Bind all the elements in the `outputs` array or in the `@Output` annotation list
	(component.outputs || []).forEach(key => {
		const mapping = key.split(/:[ ]*/);
		directive.bindToController[mapping[0]] = `&${(mapping[1] || mapping[0])}`;
	});
	Object.keys(annotations.outputs || {}).forEach(key => {
		const name = annotations.outputs[key];
		const wrapper = `__${name}EventWrapper`;

		let fn;

		Object.defineProperty(target.prototype, name, {
			enumerable: true,
			configurable: true,
			get: () => fn,
			set: function (value) {
				if (this[wrapper] === undefined) {
					this[wrapper] = value;
				}

				if (typeof value === 'function') {
					// If it is a function, the result is just the wrapper function
					fn = this[wrapper];
				} else if (value.emit && value.subscribe) {
					fn = value;
					value.subscribe(e => {
						this[wrapper]({$event: e});
					});
				}
			}
		});

		directive.bindToController[key] = `&${name}`;
	});
}
