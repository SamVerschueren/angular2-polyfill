import {annotate} from '../../utils';

export function Injectable() {
	return (target: any) => {
		annotate(target, 'injectable', true);
	};
}
