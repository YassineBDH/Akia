'use strict';

const USER_TABLE = 'user';

module.exports = {
	USER_TABLE,
	user: trx => ({
		insert: async values => {
			if (values && values.length > 0) {
				const sql = trx(USER_TABLE).insert(values).toString();
				await trx.raw(`${sql} ON CONFLICT DO NOTHING`);
				return true;
			}
			return false;
		},
		findAll: async () => {
			const result = await trx.select().from(USER_TABLE);
			return result;
		},
		findById: async id => (await trx(USER_TABLE)
			.where({ id })
		).map(({ nom, prenom, email }) => ({ nom, prenom, email })),
		findByEmail: async email => (await trx(USER_TABLE)
			.where({ email })
		).map(({ nom, prenom, email }) => ({ nom, prenom, email })),
		deleteById: async id => (trx(USER_TABLE)
			.where({ id }).del()
		)
	})
};
