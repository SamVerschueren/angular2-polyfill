import {Injector} from '../../core/core';
import * as utils from './utils';

export function bootstrap(ngModule, target) {
	const value = target.__annotations__.value;
	const name = value.name;

	console.log(value);

	ngModule.value(name, value.value);
	return name;
}
