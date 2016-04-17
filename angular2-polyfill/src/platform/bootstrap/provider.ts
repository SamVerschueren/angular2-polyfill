import {Provider} from '../../core/core';
import {toInjectorName, annotate} from '../../utils';
import * as utils from './index';

export function bootstrap(ngModule, provider: Provider) {
	let target: any = {};

	const name = toInjectorName(provider.token);
	const inject = (provider.deps || []).map(toInjectorName);

	if (provider.useValue) {
		const value = provider.useValue;
		annotate(target, 'value', {name, value});
	} else if (provider.useFactory) {
		target = provider.useFactory;
		annotate(target, 'factory', {name});
		annotate(target, 'inject', inject);
	} else if (provider.useClass) {
		target = provider.useClass;
		annotate(target, 'injectable', {name});
	} else if (provider.useExisting) {
		target = (v) => v;
		annotate(target, 'factory', {name});
		annotate(target, 'inject', [toInjectorName(provider.useExisting)]);
	}

	annotate(target, 'multi', provider.multi);

	utils.bootstrap(ngModule, target);
}
