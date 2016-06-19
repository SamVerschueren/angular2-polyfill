import test from 'ava';
import {OpaqueToken} from '../../../angular2-polyfill/src/core/classes/opaque_token';

test(t => {
	t.not(new OpaqueToken('foo').toString(), new OpaqueToken('foo').toString());
});
