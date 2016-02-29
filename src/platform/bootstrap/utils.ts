import 'reflect-metadata';
import {bootstrap as bootstrapComponent} from './component';
import {bootstrap as bootstrapPipe} from './pipe';
import {bootstrap as bootstrapInjectable} from './injectable';

export function inject(target) {
	var annotations = target.__annotations__ || {};
	var injectables = [];

	if (annotations.inject) {
		annotations.inject.forEach(function(injectable, index) {
			if (typeof injectable === 'string') {
				injectables[index] = injectable;
			} else if (injectable) {
				injectables[index] = injectable.name;
			}
		});
	}

	if (Reflect.hasMetadata('design:paramtypes', target)) {
		Reflect.getMetadata('design:paramtypes', target).forEach(function(type, index) {
			if (type.name !== 'Object') {
				injectables[index] = type.name;
			}
		});
	}

	target.$inject = injectables;
}

export function bootstrapHelper(ngModule, target): any {
	if (Array.isArray(target)) {
		return target.forEach(target => bootstrapHelper(ngModule, target));
	}

	if (target.__annotations__) {
		if (target.__annotations__.component) {
			return bootstrapComponent(ngModule, target);
		} else if (target.__annotations__.pipe) {
			return bootstrapPipe(ngModule, target);
		}
	}

	return bootstrapInjectable(ngModule, target);
}
