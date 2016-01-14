import * as angular from 'angular';
import camelcase from 'camelcase';

const map = {};
const states = {};

function bootstrapComponent(ngModule, target) {
	const annotations = target.__annotations__;
	const component = annotations.component;
	const name = camelcase(component.selector);

	if (map[target.name]) {
		return name;
	}

	map[target.name] = component.selector;

	// Bootstrap and inject the providers
	target.$inject = (component.providers || []).map(provider => bootstrapHelper(ngModule, provider));

	(component.directives || []).forEach(directive => bootstrapHelper(ngModule, directive));
	(component.pipes || []).forEach(pipe => bootstrapHelper(ngModule, pipe));

	ngModule
		.controller(target.name, target)
		.directive(name, ['$compile', ($compile) => {
			const directive: any = {
				restrict: 'E',
				scope: {},
				bindToController: {},
				controller: target.name,
				controllerAs: component.exportAs || name,
				compile: () => {
					return {
						pre: (scope, el) => {
							if (target.prototype.ngOnInit) {
								const init = $compile(`<div ng-init="${name}.ngOnInit();"></div>`)(scope);
								el.append(init);
							}
						}
					}
				}
			};

			(component.inputs || []).forEach(input => directive.bindToController[input] = '=');

			Object.keys(annotations.inputs || {}).forEach(key => directive.bindToController[key] = '=' + annotations.inputs[key]);

			if (component.template) {
				directive.template = component.template;
			} else {
				directive.templateUrl = component.templateUrl;
			}

			return directive;
		}]);

	if (annotations.routes) {
		annotations.routes.forEach(route => {
			if (route.component.name !== component.name) {
				bootstrapHelper(ngModule, route.component);
			}

			states[route.name || route.as] = {
				url: route.path,
				controller: route.component.name,
				template: `<${map[route.component.name]}></${map[route.component.name]}>`,
				isDefault: route.useAsDefault === true
			};
		});

		ngModule.config(['$urlRouterProvider', '$stateProvider', ($urlRouterProvider, $stateProvider) => {
			Object.keys(states).forEach(name => {
				const state = states[name];
				$stateProvider.state(name, state);

				if (state.isDefault) {
					$urlRouterProvider.otherwise(state.url);
				}
			});
		}])
	}

	return name;
}

function bootstrapInjectable(ngModule, target) {
	const name = camelcase(target.name);

	ngModule.service(name, target);

	return name;
}

function bootstrapPipe(ngModule, target) {
	const pipe = target.__annotations__.pipe;

	ngModule
		.filter(pipe.name, () => {
			if (pipe.pure === false) {
				const instance = new target();
				return instance.transform;
			}

			return target.prototype.transform;
		});

	return pipe.name;
}

function bootstrapHelper(ngModule, target): any {
	if (target.__annotations__.component) {
		return bootstrapComponent(ngModule, target);
	} else if (target.__annotations__.injectable) {
		return bootstrapInjectable(ngModule, target);
	} else if (target.__annotations__.pipe) {
		return bootstrapPipe(ngModule, target);
	}
}

export function bootstrap(ngModule, component) {
	bootstrapHelper(ngModule, component);
}
