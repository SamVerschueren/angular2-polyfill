import * as dotProp from 'dot-prop';

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

export interface ComponentMetadata {
	selector?: string,
	exportAs?: string,
	template?: string,
	templateUrl?: string,
	directives?: any[],
	providers?: any[],
	pipes?: any[]
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

export function Component(component: ComponentMetadata) {
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

export function Inject(token: any) {
	return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
		if (!target.__annotations__ || !target.__annotations__.inject) {
			target.__annotations__ = {
				inject: []
			};
		}

		target.__annotations__.inject[parameterIndex] = token;
	};
}
