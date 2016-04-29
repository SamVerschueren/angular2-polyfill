import test from 'ava';
import utils from './fixtures/utils';
import {bind as m} from '../../../angular2-polyfill/src/platform/utils/output';

const bind = utils.bind.bind(m, 'outputs');

test('outputs array', t => {
	t.deepEqual(bind(['foo']), {foo: '&foo'});
	t.deepEqual(bind(['foo', 'bar', 'baz']), {foo: '&foo', bar: '&bar', baz: '&baz'});
});

test('mapped outputs array', t => {
	t.deepEqual(bind(['foo:bar']), {foo: '&bar'});
	t.deepEqual(bind(['foo:bar', 'bar: baz']), {foo: '&bar', bar: '&baz'});
});

test('outputs annotation', t => {
	t.deepEqual(bind({foo: 'foo'}), {foo: '&foo'});
	t.deepEqual(bind({foo: 'foo', bar: 'bar', baz: 'baz'}), {foo: '&foo', bar: '&bar', baz: '&baz'});
});

test('mapped outputs annotation', t => {
	t.deepEqual(bind({hello: 'world'}), {hello: '&world'});
	t.deepEqual(bind({world: 'hello'}), {world: '&hello'});
});
