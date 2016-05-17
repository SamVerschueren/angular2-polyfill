'use strict';

class Target {

	constructor() {

	}
}

const createTarget = (type, v) => {
	Target.__annotations__ = {component: {}};

	if (Array.isArray(v)) {
		Target.__annotations__.component[type] = v;
	} else {
		Target.__annotations__[type] = v;
	}

	return Target;
};

exports.output = function (scope, outputs) {
	const target = createTarget('outputs', outputs);
	const directive = {bindToController: {}};

	this(scope, target, directive);

	return {
		target,
		bindings: directive.bindToController
	};
}

exports.input = function (inputs) {
	const target = createTarget('inputs', inputs);
	const directive = {bindToController: {}};

	this(target, directive);

	return directive.bindToController;
};
