'use strict';

const { user: userConstruct } = require('./user');

exports.transaction = async (connexionPromise, callback) => {
	const connexion = await connexionPromise;
	let result;
	await connexion.transaction(async trx => {
		result = await callback({
			user: userConstruct(trx)
		});
	});
	return result;
};
