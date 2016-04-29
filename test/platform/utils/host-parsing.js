import test from 'ava';
import {parse as m} from '../../../angular2-polyfill/src/platform/utils/host';

const attrs = {};
const events = {};
const props = {raw: {}, expressions: {}};

test('attributes', t => {
	t.deepEqual(m({foo: 'bar'}), {
		attrs: {
			foo: 'bar'
		},
		events,
		props
	});

	t.deepEqual(m({foo: 'bar', hello: 'world'}), {
		attrs: {
			foo: 'bar',
			hello: 'world'
		},
		events,
		props
	});
});

test('event', t => {
	t.deepEqual(m({ '(click)': 'onClick()' }), {
		events: {
			click: {
				method: 'onClick',
				params: []
			}
		},
		attrs,
		props
	});
});

test('event with `$event` object', t => {
	t.deepEqual(m({ '(mouseleave)': 'onMouseLeave($event)' }), {
		events: {
			mouseleave: {
				method: 'onMouseLeave',
				params: ['$event']
			}
		},
		attrs,
		props
	});
});

test('event with multiple params', t => {
	t.deepEqual(m({ '(mouseenter)': 'onMouseEnter($event, foo, bar,baz)' }), {
		events: {
			mouseenter: {
				method: 'onMouseEnter',
				params: ['$event', 'foo', 'bar', 'baz']
			}
		},
		attrs,
		props
	});
});

test('properties', t => {
	t.deepEqual(m({'[foo]': 'bar'}), {
		attrs,
		events,
		props: {
			raw: {},
			expressions: {
				bar: ['foo']
			}
		}
	});
});

test('multiple properties', t => {
	t.deepEqual(m({'[foo]': 'bar', '[class.red]': 'red', '[style.background]': 'red'}), {
		attrs,
		events,
		props: {
			raw: {},
			expressions: {
				bar: ['foo'],
				red: ['class.red', 'style.background']
			}
		}
	});
});

test('raw properties', t => {
	t.deepEqual(m({'[hello]': '"world"'}), {
		attrs,
		events,
		props: {
			raw: {
				world: ['hello']
			},
			expressions: {}
		}
	});
});

test('multiple raw properties', t => {
	t.deepEqual(m({'[hello]': '"world"', '[style.background]': '"red"'}), {
		attrs,
		events,
		props: {
			raw: {
				world: ['hello'],
				red: ['style.background']
			},
			expressions: {}
		}
	});
});
