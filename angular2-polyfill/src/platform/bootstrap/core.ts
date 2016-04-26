let bootstrapped = false;

export function bootstrap(ngModule) {
	if (bootstrapped) {
		return;
	}

	bootstrapped = true;

	ngModule.run(['$q', '$window', ($q, $window) => {
		// Create an Angular aware global Promise object
		$window.Promise = executor => {
			return $q(executor);
		};

		$window.Promise.all = $q.all.bind($q);
		$window.Promise.reject = $q.reject.bind($q);
		$window.Promise.resolve = $q.when.bind($q);

		$window.Promise.race = promises => {
			let promiseMgr = $q.defer();

			const resolve = result => {
				if (promiseMgr) {
					promiseMgr.resolve(result);
					promiseMgr = null;
				}
			};

			const reject = err => {
				if (promiseMgr) {
					promiseMgr.reject(err);
					promiseMgr = null;
				}
			};

			for (let i = 0; i < promises.length; i++) {
				promises[i]
					.then(resolve)
					.catch(reject);
			}

			return promiseMgr.promise;
		};
	}]);

	angular.element(document).ready(() => {
		angular.bootstrap(document, [ngModule.name]);
	});
}
