import {Injector} from '../../core/core';
import * as utils from './utils';

export function bootstrap(ngModule, target) {
	const value = target.__annotations__.value;
	const name = value.name;
	ngModule.value(name, value.value);
	return name;
}
