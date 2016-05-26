import {Inject} from '../../core';
import {Instruction} from './instruction';

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
