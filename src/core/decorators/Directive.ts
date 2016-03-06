import {DirectiveMetadata} from '../interfaces/DirectiveMetadata';
import {annotate} from '../../utils';

export function Directive(options: DirectiveMetadata) {
	return (target: any) => {
		annotate(target, 'directive', options);
	};
}
