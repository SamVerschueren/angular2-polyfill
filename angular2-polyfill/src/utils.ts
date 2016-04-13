import * as dotProp from 'dot-prop';
import * as camelcase from 'camelcase';
import {OpaqueToken} from './core/core';

/**
 * Helper functions
 */

export function annotate(target, key, value) {
	if (!target.__annotations__) {
		target.__annotations__ = {};
	}

	dotProp.set(target.__annotations__, key, value);
}

export function toInjectorName(token) {
	if (typeof token === 'string') {
		return token;
	}

	if (token instanceof OpaqueToken) {
		return camelcase(token.toString());
	}

	return token.name;
}
