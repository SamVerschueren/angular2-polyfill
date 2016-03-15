let bootstrapped = false;

export function bootstrap(ngModule, component) {
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

	angular.element(document).ready(function () {
		angular.bootstrap(document, [ngModule.name])
	});
}
