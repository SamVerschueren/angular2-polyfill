import {annotate} from '../../utils';

export function Output(bindingPropertyName?: string) {
	return (target: any, propertyKey: string) => {
		annotate(target.constructor, `outputs.${propertyKey}`, bindingPropertyName || propertyKey);
	};
}
