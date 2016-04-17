import * as camelcase from 'camelcase';
import * as dotProp from 'dot-prop';

function parseHostBinding(key: string) {
	const regex = [
		{type: 'attr', regex: /^([a-zA-Z]+)$/},
		{type: 'prop', regex: /^\[([a-zA-Z\.-]+)\]$/},
		{type: 'event', regex: /^\(([a-zA-Z]+)\)$/}
	];

	for (let i = 0; i < regex.length; i++) {
		const match = key.match(regex[i].regex);

		if (match !== null) {
			return {type: regex[i].type, value: match[1]};
		}
	};

	return {type: undefined, value: key};
}

function applyValueToProperties(el: angular.IRootElementService, properties: any[], value: any) {
	properties.forEach(property => {
		const splitted = property.split('.');

		if (splitted.length === 1) {
			// Set the property directly
			el.prop(camelcase(property), value);
		} else {
			const root = splitted.shift();

			if (root === 'class') {
				// Handle adding/removing class names
				const method = value ? 'addClass' : 'removeClass';
				el[method](splitted.join('.'));
			} else {
				// Handle deeply nested properties
				let runner = el.prop(camelcase(root));
				while (splitted.length > 1) {
					runner = runner[camelcase(splitted.shift())];
				}
				runner[camelcase(splitted.shift())] = value;
			}
		}
	});
}

export function parse(hostBindings: {string: string}[]) {
	const result = {
		attrs: {},
		events: {},
		props: {
			raw: {},
			expressions: {}
		}
	};

	Object.keys(hostBindings).forEach(key => {
		let value = hostBindings[key];
		const parsed = parseHostBinding(key);

		if (parsed.type === 'attr') {
			result.attrs[parsed.value] = value;
		} else if (parsed.type === 'event') {
			const handler = value.match(/^([a-zA-Z]+)\((.*?)\)$/);

			const method = handler[1];
			const params = handler[2].length === 0 ? [] : handler[2].split(/,[ ]*/);

			result.events[parsed.value] = {method, params};
		} else if (parsed.type === 'prop') {
			const raw = value.match(/^['"](.*?)['"]$/);
			let map = 'expressions';

			if (raw) {
				// If the value is escaped, it's a raw value and should be applied directly
				value = raw[1];
				map = 'raw';
			}

			result.props[map][value] = result.props[map][value] || [];
			result.props[map][value].push(parsed.value);
		}
	});

	return result;
}

export function bind(scope, el: angular.IRootElementService, hostBindings: any, controllerAs: string = '$ctrl') {
	// Handle attributes
	Object.keys(hostBindings.attrs).forEach(attribute => {
		el.attr(attribute, hostBindings.attrs[attribute]);
	});

	// Handle host listeners
	Object.keys(hostBindings.events).forEach(event => {
		const target = hostBindings.events[event];

		el.bind(event, e => {
			const ctx = {$event: e};
			// use scope.$apply because we are outside the angular digest cycle
			scope.$apply(() => {
				scope[controllerAs][target.method].apply(scope[controllerAs], target.params.map(param => dotProp.get(ctx, param)));
			});
		});
	});

	// Handle host property bindings
	Object.keys(hostBindings.props.raw).forEach(value => {
		const properties = hostBindings.props.raw[value];
		applyValueToProperties(el, properties, value);
	});

	Object.keys(hostBindings.props.expressions).forEach(expression => {
		const properties = hostBindings.props.expressions[expression];
		scope.$watch(`${controllerAs}.${expression}`, newValue => {
			applyValueToProperties(el, properties, newValue);
		});
	});
}
