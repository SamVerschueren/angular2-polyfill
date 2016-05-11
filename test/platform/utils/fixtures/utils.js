class Target {

	constructor() {

	}
}

const createTarget = (type, inputs) => {
	Target.__annotations__ = {component: {}};

	if (Array.isArray(inputs)) {
		Target.__annotations__.component[type] = inputs;
	} else {
		Target.__annotations__[type] = inputs;
	}

	return Target;
};

exports.bind = function (type, inputs) {
	const target = createTarget(type, inputs);
	const directive = {bindToController: {}};

	this(target, directive);

	return directive.bindToController;
};
