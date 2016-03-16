import {annotate} from '../../utils';

export function Input(bindingPropertyName?: string) {
	return (target: any, propertyKey: string) => {
		annotate(target.constructor, `inputs.${propertyKey}`, bindingPropertyName || propertyKey);
	};
}
