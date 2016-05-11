export function Optional() {
	return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
		if (!target.__annotations__) {
			target.__annotations__ = {};
		}

		target.__annotations__.optional = {};
		target.__annotations__.optional[parameterIndex] = true;
	};
}
