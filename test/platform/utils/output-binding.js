import test from 'ava';
import sinon from 'sinon';
import utils from './fixtures/utils';
import {Scope} from './fixtures/scope';
import {bind as m} from '../../../angular2-polyfill/src/platform/utils/output';
import {EventEmitter} from '../../../angular2-polyfill/core';

const bind = utils.output.bind(m);
const bindings = (t, ...args) => bind(t.context.scope, ...args).bindings;
const target = (t, ...args) => bind(t.context.scope, ...args).target;

test.beforeEach(t => {
	const scope = new Scope();
	sinon.spy(scope, '$apply');
	t.context.scope = scope;
});

test('outputs array', t => {
	t.deepEqual(bindings(t, ['foo']), {foo: '&foo'});
	t.deepEqual(bindings(t, ['foo', 'bar', 'baz']), {foo: '&foo', bar: '&bar', baz: '&baz'});
});

test('mapped outputs array', t => {
	t.deepEqual(bindings(t, ['foo:bar']), {foo: '&bar'});
	t.deepEqual(bindings(t, ['foo:bar', 'bar: baz']), {foo: '&bar', bar: '&baz'});
});

test('outputs annotation', t => {
	t.deepEqual(bindings(t, {foo: 'foo'}), {foo: '&foo'});
	t.deepEqual(bindings(t, {foo: 'foo', bar: 'bar', baz: 'baz'}), {foo: '&foo', bar: '&bar', baz: '&baz'});
});

test('mapped outputs annotation', t => {
	t.deepEqual(bindings(t, {hello: 'world'}), {hello: '&world'});
	t.deepEqual(bindings(t, {world: 'hello'}), {world: '&hello'});
});

test('has property hook', t => {
	t.true(target(t, ['foo']).prototype.hasOwnProperty('foo'));
});

test('set property hook function', t => {
	const Target = target(t, ['foo']);
	const instance = new Target();
	instance.foo = () => 'bar';

	t.is(instance.foo(), 'bar');
});

test.cb('set property hook EventEmitter', t => {
	const Target = target(t, ['foo']);
	const instance = new Target();

	// First set the listener function
	// This mimics the `<any foo="$ctrl.listener($event)" />` setter
	instance.foo = ({$event}) => {
		t.is($event, 'bar');
		t.true(t.context.scope.$apply.calledOnce);
		t.end();
	};

	// Then set the EventEmitter
	// This mimics the `@Output() foo = new EventEmitter()` setter
	instance.foo = new EventEmitter();
	instance.foo.emit('bar');
});
