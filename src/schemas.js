'use strict';

const Joi = require('joi');

const schemas = {
	body: Joi.object().keys({
		nom: Joi.string().required(),
		prenom: Joi.string().required(),
		email: Joi.string().email(),
		password: Joi.string().min(8).required()
	}),
	params: Joi.object().keys({
		userId: Joi.number().required()
	})
};

module.exports = schemas;