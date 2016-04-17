import {Provider} from '../../core/core';
import {bootstrap as bootstrapComponent} from './component';
import {bootstrap as bootstrapDirective} from './directive';
import {bootstrap as bootstrapFactory} from './factory';
import {bootstrap as bootstrapPipe} from './pipe';
import {bootstrap as bootstrapValue} from './value';
import {bootstrap as bootstrapInjectable} from './injectable';
import {bootstrap as bootstrapProvider} from './provider';

export function bootstrap(ngModule, target): any {
	if (Array.isArray(target)) {
		return target.forEach(target => bootstrap(ngModule, target));
	}

	if (target.__annotations__) {
		if (target.__annotations__.component) {
			return bootstrapComponent(ngModule, target);
		} else if (target.__annotations__.directive) {
			return bootstrapDirective(ngModule, target);
		} else if (target.__annotations__.factory) {
			return bootstrapFactory(ngModule, target);
		} else if (target.__annotations__.pipe) {
			return bootstrapPipe(ngModule, target);
		} else if (target.__annotations__.value) {
			return bootstrapValue(ngModule, target);
		}
	}

	if (target instanceof Provider) {
		return bootstrapProvider(ngModule, target);
	}

	return bootstrapInjectable(ngModule, target);
}
