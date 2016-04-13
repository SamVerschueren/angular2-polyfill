import {bootstrap as coreBootstrap} from './bootstrap/core';
import {bootstrap as commonBootstrap} from '../common/common';
import {bootstrapHelper} from './bootstrap/utils';
import {Injector, provide} from '../core/core';

export function bootstrap(ngModule, component, providers: any[] = []) {
	// Bootstrap the core
	coreBootstrap(ngModule, component);

	// Bootstrap common components
	commonBootstrap(ngModule);

	// Bootstrap the injector
	bootstrapHelper(ngModule, provide(Injector, {useFactory: () => new Injector(ngModule)}));

	// Bootstrap the app tree
	bootstrapHelper(ngModule, component);

	// Bootstrap providers
	providers.forEach(provider => bootstrapHelper(ngModule, provider));
}
