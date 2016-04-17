import * as injector from '../utils/injector';
import {bootstrapMultiFactory as bootstrapMulti} from './multi';

export function bootstrap(ngModule, target) {
	const annotations = target.__annotations__;
	const factory = annotations.factory;

	injector.inject(ngModule, target);

	const name = factory.name || target.name;

	if (annotations.multi === true) {
		bootstrapMulti(ngModule, name, target);
	} else {
		ngModule.factory(name, target);
	}

	return name;
}
