'use strict';

exports.validatorBody = schema => (req, res, next) => {
	const { error } = schema.validate(req.body);
	const valid = error == null;

	if (valid) {
		next();
	} else {
		const { details } = error;
		const message = details.map(i => i.message).join(',');

		console.log('error', message);
		res.status(422).json({ error: message });
	}
};

exports.validatorParams = schema => (req, res, next) => {
	const { error } = schema.validate(req.params);
	const valid = error == null;

	if (valid) {
		next();
	} else {
		const { details } = error;
		const message = details.map(i => i.message).join(',');

		console.log('error', message);
		res.status(422).json({ error: message });
	}
};