import 'reflect-metadata';
import {bootstrap as bootstrapComponent} from './component';
import {bootstrap as bootstrapDirective} from './directive';
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

export function bindInput(target, directive) {
	const annotations = target.__annotations__;
	const component = annotations.component || annotations.directive;

	function signOf(key) {
		if (Reflect.hasMetadata('design:type', target.prototype, key)) {
			const type = Reflect.getMetadata('design:type', target.prototype, key);

			if (type.name === 'String') {
				return '@';
			}
		}

		return '=';
	}

	// Bind all the elements in the `inputs` array
	(component.inputs || []).forEach(key => {
		directive.bindToController[key] = signOf(key);
	});

	// Bind all the elements in the `@Input` annotation list
	Object.keys(annotations.inputs || {}).forEach(key => {
		directive.bindToController[key] = signOf(key) + annotations.inputs[key];
	});
}

export function bindOutput(target, directive) {
	const annotations = target.__annotations__;
	const component = annotations.component || annotations.directive;

	// Bind all the elements in the `outputs` array or in the `@Output` annotation list
	(component.outputs || []).forEach(key => directive.bindToController[key] = '&');
	Object.keys(annotations.outputs || {}).forEach(key => directive.bindToController[key] = `&${annotations.outputs[key]}`);
}

export function bootstrapHelper(ngModule, target): any {
	if (Array.isArray(target)) {
		return target.forEach(target => bootstrapHelper(ngModule, target));
	}

	if (target.__annotations__) {
		if (target.__annotations__.component) {
			return bootstrapComponent(ngModule, target);
		} else if (target.__annotations__.directive) {
			return bootstrapDirective(ngModule, target);
		} else if (target.__annotations__.pipe) {
			return bootstrapPipe(ngModule, target);
		}
	}

	return bootstrapInjectable(ngModule, target);
}
