'use strict';

const { transaction } = require('../repository/transacting');
const { KNEX } = require('../db/connexion');
const { hashData, verifyHashedData, createToken } = require('./util');

async function createUser(body) {
	try{
		const {nom, prenom, email, password } = body;
		const userByEmail = await getUserByEmailRepo(email);
		console.log('userByEmail :',userByEmail);
		if (userByEmail){
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
async function deleteUserById(req, res) {
	try {
		const id = decodeURIComponent(req.params.userId);
		await deleteUserByIdRepo(id);
		console.log('delete User By id',id);
	} catch (error) {
		throw error;
	}
	
}
async function getAllUsers() {
	try {
		const result = await getAllUsersRepo();
		console.log('get All users', { result });
		return result
	} catch (error) {
		throw error;
	}
	
}
const authenticateUser = async (data) => {
	try {
		const { email, password } = data;
		const userByEmail = await getUserByEmailRepo(email);
		console.log('userByEmail :',userByEmail);
		if (!userByEmail){
			throw Error("Utilisateur n'existe pas");
		}
		const hashedPassword = userByEmail.password;
		const isPasswordMatch = await verifyHashedData(password, hashedPassword);
		if(!isPasswordMatch){
			throw Error("le mot de passe est invalide");
		}
		const tokenData = {userId: userByEmail.id, email};
		const accessToken = await createToken(tokenData);

		return {accessToken};
	}catch (error){
		throw error;
	}
};
function getUserByIdRepo(id) {
	return transaction(KNEX, ({ user }) => user.findById(id));
}
function deleteUserByIdRepo(id) {
	return transaction(KNEX, ({ user }) => user.deleteById(id));
}
function getUserByEmailRepo(email) {
	return transaction(KNEX, ({ user }) => user.findByEmail(email));
}

function insertUserRepo(userToCreate) {
	return transaction(KNEX, ({ user }) => user.insert([userToCreate]));
}
function getAllUsersRepo() {
	return transaction(KNEX, ({ user }) => user.findAll());
}

module.exports = {
	createUser, 
	getUserById,
	authenticateUser,
	getAllUsers,
	deleteUserById
};
