'use strict';

const { transaction } = require('../repository/transacting');
const { KNEX } = require('../db/connexion');
const { hashData } = require('./util');

async function createUser(body) {
	try{
		const {nom, prenom, email, password } = body;
		const userByEmail = await getUserByEmailRepo(email);
		console.log('userByEmail :',userByEmail);
		if (userByEmail.length>0){
			throw Error("Utilisateur existe déja");
		}
		const hashedPassword = await hashData(password);

		return await insertUserRepo({nom, prenom, email, password: hashedPassword});

	} catch (error){
		throw error;
	}
}

async function getUserById(req, res) {
	try {
		const id = decodeURIComponent(req.params.userId);
		const result = await getUserByIdRepo(id);
		console.log('get User By id', { result });
		return result
	} catch (error) {
		throw error;
	}
	
}

function getUserByIdRepo(id) {
	return transaction(KNEX, ({ user }) => user.findById(id));
}
function getUserByEmailRepo(email) {
	return transaction(KNEX, ({ user }) => user.findByEmail(email));
}

function insertUserRepo(userToCreate) {
	return transaction(KNEX, ({ user }) => user.insert([userToCreate]));
}

module.exports = {
	createUser, 
	getUserById
};
