import * as angular from 'angular';
import * as camelcase from 'camelcase';
import 'reflect-metadata';

let bootstrapped = false;
const map = {};
const states = {};

function inject(target) {
	var annotations = target.__annotations__ || {};
	var injectables = [];

	if (annotations.inject) {
		annotations.inject.forEach(function(injectable, index) {
			if (typeof injectable === 'string') {
				injectables[index] = camelcase(injectable);
			} else if (injectable) {
				injectables[index] = camelcase(injectable.name);
			}
		});
	}

	if (Reflect.hasMetadata('design:paramtypes', target)) {
		Reflect.getMetadata('design:paramtypes', target).forEach(function(type, index) {
			if (type.name !== 'Object') {
				injectables[index] = camelcase(type.name);
			}
		});
	}

	target.$inject = injectables;
}

function coreBootstrap(ngModule, component) {
	if (bootstrapped) {
		return;
	}

	bootstrapped = true;

	ngModule.run(['$q', '$window', function($q, $window) {
		// Create an Angular aware global Promise object
		$window.Promise = function (executor) {
			return $q(executor);
		};

		$window.Promise.all = $q.all.bind($q);
		$window.Promise.reject = $q.reject.bind($q);
		$window.Promise.resolve = $q.when.bind($q);

		$window.Promise.race = function (promises) {
			var promiseMgr = $q.defer();

			var resolve = function (result) {
				if (promiseMgr) {
					promiseMgr.resolve(result);
					promiseMgr = null;
				}
			};

			var reject = function (err) {
				if (promiseMgr) {
					promiseMgr.reject(err);
					promiseMgr = null;
				}
			};

			for (var i = 0; i < promises.length; i++) {
				promises[i]
					.then(resolve)
					.catch(reject);
			}

			return promiseMgr.promise;
		};
	}]);
}

function bootstrapComponent(ngModule, target) {
	const annotations = target.__annotations__;
	const component = annotations.component;
	const name = camelcase(component.selector);

	if (map[target.name]) {
		return name;
	}

	map[target.name] = component.selector;

	// Bootstrap providers, directives and pipes
	(component.providers || []).forEach(provider => bootstrapHelper(ngModule, provider));
	(component.directives || []).forEach(directive => bootstrapHelper(ngModule, directive));
	(component.pipes || []).forEach(pipe => bootstrapHelper(ngModule, pipe));

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

	// Inject the services
	inject(target);

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
	if (Array.isArray(target)) {
		return target.forEach(target => bootstrapHelper(ngModule, target));
	}

	if (target.__annotations__) {
		if (target.__annotations__.component) {
			return bootstrapComponent(ngModule, target);
		} else if (target.__annotations__.pipe) {
			return bootstrapPipe(ngModule, target);
		}
	}

	return bootstrapInjectable(ngModule, target);
}

export function bootstrap(ngModule, component, providers:any[] = []) {
	// Bootstrap the core
	coreBootstrap(ngModule, component);

	// Bootstrap the app tree
	bootstrapHelper(ngModule, component);

	// Bootstrap providers
	providers.forEach(provider => bootstrapHelper(ngModule, provider));
}
