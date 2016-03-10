import {Instruction} from '../instruction';
import {annotate} from '../../utils';

export function CanActivate(hook: Function | ((next: Instruction, prev: Instruction) => Promise<boolean> | boolean)) {
	return (target: any) => {
		annotate(target, 'router.canActivate', hook);
	};
}

export interface CanActivate {
	routerCanActivate(next: Instruction, prev: Instruction): Promise<boolean> | boolean;
}
