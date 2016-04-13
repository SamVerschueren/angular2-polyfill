import {inject} from './utils';

export function bootstrap(ngModule, target) {
	const annotations = target.__annotations__ || {};
	const injectable = annotations.injectable || {};

	const name = injectable.name || target.name;

	// Inject the services
	inject(target);

	ngModule.service(name, target);
	return name;
}
