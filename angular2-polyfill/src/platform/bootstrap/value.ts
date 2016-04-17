import {bootstrapMultiValue as bootstrapMulti} from './multi';

export function bootstrap(ngModule, target) {
	const annotations = target.__annotations__;
	const value = annotations.value;
	const name = value.name;

	const ret = value.value;

	if (annotations.multi === true) {
		bootstrapMulti(ngModule, name, ret);
	} else {
		ngModule.value(name, ret);
	}

	return name;
}
