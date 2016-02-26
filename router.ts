import {Inject} from './core';
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

/**
 * Providers
 */

export class Instruction {
	_state: string;
	urlPath: string;
	urlParams: string;
}

export class Router {

	constructor(@Inject('$state') private state) {

	}

	isRouteActive(instruction: Instruction): boolean {
		return this.state.is(instruction._state, instruction.urlParams);
	}

	navigate(linkParams: any[]): Promise<any> {
		return this.state.go(linkParams[0], linkParams[1] || {});
	}

	renavigate(): Promise<any> {
		return this.state.reload(this.state.current);
	}

	generate(linkParams: any[]): Promise<Instruction> {
		const state = linkParams[0];
		const params = linkParams[1] || {};
		const url = this.state.href(state, params);

		const instruction = new Instruction();
		instruction._state = state;
		instruction.urlPath = this.state.href(state, params);
		instruction.urlParams = params;

		return Promise.resolve(instruction);
	}
}

export class RouteParams {

	constructor(@Inject('$stateParams') private stateParams) {

	}

	get(param: string): string {
		return this.stateParams[param];
	}
}

// Export the providers
export const ROUTER_PROVIDERS = [Router, RouteParams];
