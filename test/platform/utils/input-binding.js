import test from 'ava';
import sinon from 'sinon';
import {Reflect} from './fixtures/reflect';
import utils from './fixtures/utils';
import {bind as m} from '../../../angular2-polyfill/src/platform/utils/input';

const sandbox = sinon.sandbox.create();
const bind = utils.input.bind(m);

test.before(() => {
	const has = sandbox.stub(Reflect, 'hasMetadata');
	has.withArgs('design:type', sinon.match.any, 'hello').returns(true);
	has.withArgs('design:type', sinon.match.any, 'world').returns(true);

	const get = sandbox.stub(Reflect, 'getMetadata');
	get.withArgs('design:type', sinon.match.any, 'hello').returns(String);
	get.withArgs('design:type', sinon.match.any, 'world').returns(Object);
});

test.after(() => {
	sandbox.restore();
});

test('inputs array', t => {
	t.deepEqual(bind(['foo']), {foo: '@foo'});
	t.deepEqual(bind(['foo', 'bar', 'baz']), {foo: '@foo', bar: '@bar', baz: '@baz'});
});

test('mapped inputs array', t => {
	t.deepEqual(bind(['foo:bar']), {foo: '@bar'});
	t.deepEqual(bind(['foo:bar', 'bar: baz']), {foo: '@bar', bar: '@baz'});
});

test('signed inputs array', t => {
	t.deepEqual(bind(['=foo']), {foo: '=foo'});
});

test('inputs annotation', t => {
	t.deepEqual(bind({hello: 'hello'}), {hello: '@hello'});
	t.deepEqual(bind({world: 'world'}), {world: '=world'});
});

test('mapped inputs annotation', t => {
	t.deepEqual(bind({hello: 'world'}), {hello: '@world'});
	t.deepEqual(bind({world: 'hello'}), {world: '=hello'});
});

test('signed inputs annotation', t => {
	t.deepEqual(bind({hello: '<'}), {hello: '<hello'});
	t.deepEqual(bind({world: '@world'}), {world: '@world'});
});
