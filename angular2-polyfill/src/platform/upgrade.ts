import {bootstrap as coreBootstrap} from './bootstrap/core';
import {bootstrapHelper} from './bootstrap/utils';

export function bootstrap(ngModule, component, providers: any[] = []) {
	// Bootstrap the core
	coreBootstrap(ngModule, component);

	// Bootstrap the app tree
	bootstrapHelper(ngModule, component);

	// Bootstrap providers
	providers.forEach(provider => bootstrapHelper(ngModule, provider));
}
