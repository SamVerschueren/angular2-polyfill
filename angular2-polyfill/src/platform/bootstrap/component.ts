import * as camelcase from 'camelcase';
import * as decamelize from 'decamelize';
import {Router} from '../../router/router';
import * as utils from './utils';

let map = {};
const states = {};

export function bootstrap(ngModule, target, parentState?: any) {
	const annotations = target.__annotations__;
	const component = annotations.component;
	const name = camelcase(component.selector || target.name);
	const styleElements: any[] = [];
	const headEl = angular.element(document).find('head');

	if (map[target.name]) {
		return name;
	}

	map[target.name] = decamelize(component.selector || target.name, '-');

	// Bootstrap providers, directives and pipes
	(component.providers || []).forEach(provider => utils.bootstrapHelper(ngModule, provider));
	(component.directives || []).forEach(directive => utils.bootstrapHelper(ngModule, directive));
	(component.pipes || []).forEach(pipe => utils.bootstrapHelper(ngModule, pipe));

	// Define the style elements
	(component.styles || []).forEach(style => {
		styleElements.push(angular.element('<style type="text/css">@charset "UTF-8";' + style + '</style>'));
	});
	(component.styleUrls || []).forEach(url => {
		styleElements.push(angular.element('<link rel="stylesheet" href="' + url + '">'));
	});

	// Inject the services
	utils.inject(target);

	const hostBindings = utils.parseHosts(component.host || {});

	ngModule
		.controller(target.name, target)
		.directive(name, ['$compile', ($compile) => {
			const directive: any = {
				restrict: 'E',
				scope: {},
				bindToController: {},
				controller: target.name,
				controllerAs: component.exportAs || '$ctrl',
				transclude: true,
				compile: () => {
					// Prepend all the style elements to the `head` dom element
					styleElements.forEach(el => headEl.prepend(el));

					return {
						pre: (scope, el) => {
							// Bind the hosts
							utils.bindHostBindings(scope, el, hostBindings, component.controllerAs);

							if (target.prototype.ngOnInit) {
								// Call the `ngOnInit` lifecycle hook
								const init = $compile(`<div ng-init="${directive.controllerAs}.ngOnInit();"></div>`)(scope);
								el.append(init);
							}

							scope.$on('$destroy', () => {
								// Remove all the style elements when destroying the directive
								styleElements.forEach(el => el.remove());

								if (target.prototype.ngOnDestroy) {
									// Call the `ngOnDestroy` lifecycle hook
									scope[directive.controllerAs].ngOnDestroy();
								}
							});
						}
					}
				}
			};

			// Bind inputs and outputs
			utils.bindInput(target, directive);
			utils.bindOutput(target, directive);

			// Set the template
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
			const routerAnnotations = route.component.__annotations__ && route.component.__annotations__.router;

			const state: any = {
				name,
				url: route.path,
				isDefault: route.useAsDefault === true
			}

			// Bootstrap the route component if it's not the same as the target component
			if (route.component.name !== component.name) {
				bootstrap(ngModule, route.component, state);
			}

			// If the url ends with `/...` this is a non-terminal route and thus is abstract.
			if (state.url.substr(-4) === '/...') {
				state.url = state.url.substr(0, state.url.length - 4);
				state.abstract = true;
			}

			// Set the `parent` property if the parent is a non-terminal route
			if (parentState && parentState.url && parentState.url.substr(-4) === '/...') {
				state.parent = parentState.name;
			}

			// Set the template after we are sure the component has been bootstrapped
			state.template = `<${map[route.component.name]}></${map[route.component.name]}>`;

			// Push the state to the component states
			cmpStates.push(state.name);

			// Keep track of all the application states
			states[name] = state;

			// Attach CanActivate router hook
			if (routerAnnotations && routerAnnotations.canActivate) {
				const hook: any[] = ['Router', '$state', '$stateParams'];

				if (Object.keys(routerAnnotations.canActivate.prototype).length > 0) {
					if (!routerAnnotations.canActivate.prototype.routerCanActivate) {
						throw new Error('@CanActivate class does not implement the `CanActivate` interface.');
					}

					hook.push(utils.bootstrapHelper(ngModule, routerAnnotations.canActivate));
				}

				hook.push((router: Router, $state, $stateParams, handler) => {
					const fn: Function = handler ? handler.routerCanActivate : routerAnnotations.canActivate;

					// Generate instructions for the previous and next state
					return Promise.all([
						router.generate([name, $stateParams]),
						$state.current.name.length === 0 ? null : router.generate([$state.current.name, $state.params])
					]).then(instructions => {
						// Call the routerCanActivate hook with the instructions
						return Promise.resolve(fn.apply(handler, instructions));
					}).then(result => {
						if (!result) {
							// Reject if the result is false
							return Promise.reject('could not activate');
						}
					});
				});

				states[name].resolve = {
					routerCanActivate: hook
				};
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
