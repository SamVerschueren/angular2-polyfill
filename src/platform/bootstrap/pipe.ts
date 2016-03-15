export function bootstrap(ngModule, target) {
	const pipe = target.__annotations__.pipe;

	ngModule
		.filter(pipe.name, () => {
			return function(value, ...args: any[]) {
				if (pipe.pure === false) {
					const instance = new target();
					return instance.transform(value, args);
				}

				return target.prototype.transform(value, args);
			}
		});

	return pipe.name;
}
