import {inject} from './utils';

export function bootstrap(ngModule, target) {
	const name = target.name;

	// Inject the services
	inject(target);

	ngModule.service(name, target);

	return name;
}
