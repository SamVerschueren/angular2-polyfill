import * as angular from 'angular';
import * as camelcase from 'camelcase';

function coreBootstrap(component) {
	const appName = component.__annotations__.component.selector;

	angular.module('app.components', []);
	angular.module('app.services', []);
	angular.module('app.filters', []);
	angular
		.module(appName, ['app.components', 'app.services', 'app.filters'])
		.run(['$q', '$window', function($q, $window) {
			// Create an Angular aware global Promise object
			$window.Promise = function (executor) {
				console.log('Promise');
				return $q(executor);
			};

			console.log('promise overwritten');

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

function bootstrapComponent(target) {
	const annotations = target.__annotations__;
	const component = annotations.component;

	// Bootstrap and inject the providers
	target.$inject = (component.providers || []).map(bootstrapHelper);

	(component.directives || []).forEach(bootstrapHelper);
	(component.pipes || []).forEach(bootstrapHelper);

	const name = camelcase(component.selector);

	angular
		.module('app.components')
		.controller(target.name, target)
		.directive(name, ['$compile', ($compile) => {
			const directive: any = {
				restrict: 'E',
				scope: {},
				bindToController: {},
				controller: target.name,
				controllerAs: component.controllerAs || name,
				compile: () => {
					return {
						pre: (scope, el) => {
							if (target.prototype.ngOnInit) {
								const init = $compile('<div ng-init="myApp.ngOnInit();"></div>')(scope);
								el.append(init);
							}
						}
					}
				}
			};

			(component.inputs || []).forEach(input => directive.bindToController[input] = '=');

			Object.keys(annotations.inputs || {}).forEach(key => directive.bindToController[key] = '=' + annotations.inputs[key]);

			console.log(directive);

			if (component.template) {
				directive.template = component.template;
			} else {
				directive.templateUrl = component.templateUrl;
			}

			return directive;
		}]);

	return name;
}

function bootstrapInjectable(target) {
	const name = camelcase(target.name);

	angular
		.module('app.services')
		.service(name, target);

	return name;
}

function bootstrapPipe(target) {
	const pipe = target.__annotations__.pipe;

	angular
		.module('app.filters')
		.filter(pipe.name, () => {
			if (pipe.pure === false) {
				const instance = new target();
				return instance.transform;
			}

			return target.prototype.transform;
		});

	return pipe.name;
}

function bootstrapHelper(target): any {
	if (target.__annotations__.component) {
		return bootstrapComponent(target);
	} else if (target.__annotations__.injectable) {
		return bootstrapInjectable(target);
	} else if (target.__annotations__.pipe) {
		return bootstrapPipe(target);
	}
}

export function bootstrap(base) {
	// Bootstrap the core
	coreBootstrap(base);

	// Bootstrap the app tree
	bootstrapHelper(base);
}
