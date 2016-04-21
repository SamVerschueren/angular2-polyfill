const createTarget = (type, inputs) => {
	const ret = {
		__annotations__: {
			component: {}
		}
	};

	if (Array.isArray(inputs)) {
		ret.__annotations__.component[type] = inputs;
	} else {
		ret.__annotations__[type] = inputs;
	}

	return ret;
};

exports.bind = function (type, inputs) {
	const target = createTarget(type, inputs);
	const directive = {bindToController: {}};

	this(target, directive);

	return directive.bindToController;
};
