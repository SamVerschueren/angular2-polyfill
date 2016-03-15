import * as dotProp from 'dot-prop';

/**
 * Helper functions
 */

export function annotate(target, key, value) {
	if (!target.__annotations__) {
		target.__annotations__ = {};
	}

	dotProp.set(target.__annotations__, key, value);
}
