'use strict'

const knex = require('knex');

async function getConnectionInfo() {
	return {
		host: 'localhost',
		user: 'postgres',
		password: 'postgres',
		database: 'akia'
	};
}

async function getConnection() {
	const infos = await getConnectionInfo();
	return knex({
		client: 'pg',
		connection: infos,
		pool: { min: 2, max: 20 }
	});
}

const KNEX = getConnection();

module.exports = {KNEX} ;