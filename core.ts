import * as dotProp from 'dot-prop';
import camelcase = require('camelcase');

/**
 * Helper functions
 */

function annotate(target, key, value) {
	if (!target.__annotations__) {
		target.__annotations__ = {};
	}

	dotProp.set(target.__annotations__, key, value);
}

/**
 * Interfaces
 */

export interface ComponentInterface {
	selector: string,
	template: string,
	templateUrl: string,
	controllerAs: string,
	directives: any[],
	providers: any[],
	pipes: any[]
}

export interface PipeInterface {
	name: string,
	pure: boolean
}

export interface OnInit {
	ngOnInit(): void;
}

export interface PipeTransform {
	transform(value: any, args: any[]): any;
}

/**
 * Decorators
 */

export function Component(component: any) {
	return (target: any) => {
		annotate(target, 'component', component);
	};
}

export function Injectable() {
	return (target: any) => {
		annotate(target, 'injectable', true);
	};
}

export function Input(bindingPropertyName?: string) {
	return (target: any, propertyKey: string) => {
		annotate(target.constructor, `inputs.${propertyKey}`, bindingPropertyName || propertyKey);
	};
}

export function Pipe(pipe: PipeInterface) {
	return (target: any) => {
		annotate(target, 'pipe', pipe);
	}
}
