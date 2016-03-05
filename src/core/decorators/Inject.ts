export function Inject(token: any) {
	return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
		if (!target.__annotations__) {
			target.__annotations__ = {};
		}

		if (!target.__annotations__.inject) {
			target.__annotations__.inject = [];
		}

		target.__annotations__.inject[parameterIndex] = token;
	};
}
