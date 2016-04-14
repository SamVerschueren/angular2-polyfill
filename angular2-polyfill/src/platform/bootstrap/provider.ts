import {Provider} from '../../core/core';
import {toInjectorName, annotate} from '../../utils';
import * as utils from './utils';

export function bootstrap(ngModule, provider: Provider) {
	let target: any = {};

	const name = toInjectorName(provider.token);
	const inject = (provider.deps || []).map(toInjectorName);

	// TODO implement multi

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
		// TODO implement
		throw new Error('Not yet implemented');
	}

	annotate(target, 'multi', provider.multi);

	utils.bootstrapHelper(ngModule, target);
}
