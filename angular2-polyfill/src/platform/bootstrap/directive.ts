import * as utils from './utils';

function parseSelector(selector: string) {
	const regex = [
		// {key: 'E', value: /^([a-zA-Z])$/},
		{key: 'A', value: /^\[([a-zA-Z]+)\]$/},
		{key: 'C', value: /^\.([a-zA-Z]+)$/}
	];

	for (let i = 0; i < regex.length; i++) {
		const result = selector.match(regex[i].value);

		if (result !== null) {
			return {restrict: regex[i].key, name: result[1]};
		}
	};

	throw new Error(`Selector ${selector} could not be parsed`);
}

export function bootstrap(ngModule, target) {
	const annotations = target.__annotations__;
	const directive = annotations.directive;

	const selector = parseSelector(directive.selector);
	const hostBindings = utils.parseHosts(directive.host || {});

	// Inject the services
	utils.inject(target);

	ngModule
		.controller(target.name, target)
		.directive(selector.name, [() => {
			const declaration: any = {
				restrict: selector.restrict,
				scope: {},
				bindToController: {},
				controller: target.name,
				controllerAs: '$ctrl',
				link: (scope, el) => utils.bindHostBindings(scope, el, hostBindings)
			};

			// Bind inputs and outputs
			utils.bindInput(target, declaration);
			utils.bindOutput(target, declaration);

			return declaration;
		}]);
}
