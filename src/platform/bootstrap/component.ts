import * as angular from 'angular';
import * as camelcase from 'camelcase';
import {bootstrapHelper, inject} from './utils';

let map = {};
const states = {};

export function bootstrap(ngModule, target, parentState?: string) {
	const annotations = target.__annotations__;
	const component = annotations.component;
	const name = camelcase(component.selector);
	const styleElements: any[] = [];
	const headEl = angular.element(document).find('head');

	if (map[target.name]) {
		return name;
	}

	map[target.name] = component.selector;

	// Bootstrap providers, directives and pipes
	(component.providers || []).forEach(provider => bootstrapHelper(ngModule, provider));
	(component.directives || []).forEach(directive => bootstrapHelper(ngModule, directive));
	(component.pipes || []).forEach(pipe => bootstrapHelper(ngModule, pipe));

	// Define the style elements
	(component.styles || []).forEach(style => {
		styleElements.push(angular.element('<style type="text/css">@charset "UTF-8";' + style + '</style>'));
	});
	(component.styleUrls || []).forEach(url => {
		styleElements.push(angular.element('<link rel="stylesheet" href="' + url + '">'));
	});

	// Inject the services
	inject(target);

	ngModule
		.controller(target.name, target)
		.directive(name, ['$compile', ($compile) => {
			const directive: any = {
				restrict: 'E',
				scope: {},
				bindToController: {},
				controller: target.name,
				controllerAs: component.exportAs || name,
				transclude: true,
				compile: () => {
					return {
						pre: (scope, el) => {
							if (target.prototype.ngOnInit) {
								// Call the `ngOnInit` lifecycle hook
								const init = $compile(`<div ng-init="${name}.ngOnInit();"></div>`)(scope);
								el.append(init);
							}

							// Prepend all the style elements to the `head` dom element
							styleElements.forEach(el => headEl.prepend(el));

							scope.$on('$destroy', () => {
								// Remove all the style elements when destroying the directive
								styleElements.forEach(el => el.remove());

								if (target.prototype.ngOnDestroy) {
									// Call the `ngOnDestroy` lifecycle hook
									scope[name].ngOnDestroy();
								}
							});
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
		var cmpStates = [];

		annotations.routes.forEach(route => {
			const name = route.name || route.as;

			if (route.component.name !== component.name) {
				bootstrap(ngModule, route.component, name);
			}

			cmpStates.push(name);
			states[name] = {
				url: route.path,
				controller: route.component.name,
				template: `<${map[route.component.name]}></${map[route.component.name]}>`,
				isDefault: route.useAsDefault === true
			};

			if (parentState) {
				states[name].parent = parentState;
			}
		});

		ngModule.config(['$urlRouterProvider', '$stateProvider', ($urlRouterProvider, $stateProvider) => {
			cmpStates.forEach(name => {
				const state = states[name];
				$stateProvider.state(name, state);

				if (state.isDefault) {
					if (state.parent) {
						let parentState = states[state.parent];
						let from = parentState.url;

						while (parentState.parent) {
							parentState = states[parentState.parent];
							from = parentState.url + from;
						}

						$urlRouterProvider.when(from, from + state.url);
					} else {
						$urlRouterProvider.otherwise(state.url);
					}
				}
			});
		}])
	}

	return name;
}
