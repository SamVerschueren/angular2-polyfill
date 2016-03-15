export function bootstrap(ngModule, target) {
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
