import * as utils from './utils';

export function bootstrap(ngModule, target) {
	const pipe = target.__annotations__.pipe;
	utils.inject(target);

	const filter = target.$inject || [];
	filter.push((...args) => {
		// Create a new instance and inject the dependencies
		const instance = new target(...args);

		// Create the filter function
		const filter: any = function(value, ...args: any[]) {
			return instance.transform(value, args);
		}

		// If pure is set to false, it's a stateful filter
		filter.$stateful = pipe.pure === false;

		return filter;
	});

	ngModule.filter(pipe.name, filter);
	return pipe.name;
}
