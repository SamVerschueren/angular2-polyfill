import * as utils from './utils';

export function bootstrap(ngModule, target) {
	const annotations = target.__annotations__;
	const factory = annotations.factory;

	utils.inject(target);

	const name = factory.name || target.name;
	ngModule.factory(name, target);
	return name;
}
