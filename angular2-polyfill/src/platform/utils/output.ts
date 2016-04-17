export function bind(target, directive) {
	const annotations = target.__annotations__;
	const component = annotations.component || annotations.directive;

	// Bind all the elements in the `outputs` array or in the `@Output` annotation list
	(component.outputs || []).forEach(key => {
		const mapping = key.split(/:[ ]*/);
		directive.bindToController[mapping[0]] = '&' + (mapping[1] || mapping[0]);
	});
	Object.keys(annotations.outputs || {}).forEach(key => directive.bindToController[key] = `&${annotations.outputs[key]}`);
}
