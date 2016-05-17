import * as host from '../utils/host';
import * as injector from '../utils/injector';
import * as input from '../utils/input';
import * as output from '../utils/output';

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
	const hostBindings = host.parse(directive.host || {});

	// Inject the services
	injector.inject(ngModule, target);

	ngModule
		.controller(target.name, target)
		.directive(selector.name, ['$rootScope', ($rootScope) => {
			const declaration: any = {
				restrict: selector.restrict,
				scope: {},
				bindToController: {},
				controller: target.name,
				controllerAs: '$ctrl',
				link: (scope, el) => host.bind(scope, el, hostBindings)
			};

			// Bind inputs and outputs
			input.bind(target, declaration);
			output.bind($rootScope, target, declaration);

			return declaration;
		}]);
}
