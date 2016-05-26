import {Inject} from '../../core';

export class RouteParams {
	constructor(@Inject('$stateParams') private stateParams) {}

	get(param: string): string {
		return this.stateParams[param];
	}
}

export class Instruction {
	_state: string;
	urlPath: string;
	urlParams: string;
}
