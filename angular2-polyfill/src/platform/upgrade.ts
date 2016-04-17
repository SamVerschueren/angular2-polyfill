import {bootstrap as coreBootstrap} from './bootstrap/core';
import {bootstrap as commonBootstrap} from '../common/common';
import {bootstrap as bootstrapHelper} from './bootstrap/index';
import {Injector, provide} from '../core/core';

export function bootstrap(ngModule, component, providers: any[] = []) {
	// Bootstrap the core
	coreBootstrap(ngModule);

	// Bootstrap common components
	commonBootstrap(ngModule);

	// Bootstrap the injector
	bootstrapHelper(ngModule, provide(Injector, {useFactory: () => new Injector()}));

	// Bootstrap providers
	providers.forEach(provider => bootstrapHelper(ngModule, provider));

	// Bootstrap the app tree
	bootstrapHelper(ngModule, component);
}
