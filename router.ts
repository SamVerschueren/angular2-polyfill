import * as dotProp from 'dot-prop';

export interface RouteDefinition {
	path?: string,
	component?: any,
	as?: string,
	name?: string,
	useAsDefault?: boolean
}

/**
 * Helper functions
 */

function annotate(target, key, value) {
	if (!target.__annotations__) {
		target.__annotations__ = {};
	}

	dotProp.set(target.__annotations__, key, value);
}

/**
 * Decorators
 */

export function RouteConfig(routes: RouteDefinition[]) {
	return (target: any) => {
		annotate(target, 'routes', routes);
	};
}
