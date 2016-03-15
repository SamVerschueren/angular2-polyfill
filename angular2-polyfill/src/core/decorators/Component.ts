import {ComponentMetadata} from '../interfaces/ComponentMetadata';
import {annotate} from '../../utils';

export function Component(component: ComponentMetadata) {
	return (target: any) => {
		annotate(target, 'component', component);
	};
}
