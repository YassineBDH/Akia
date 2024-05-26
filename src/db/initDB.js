'use strict';

const {KNEX} = require('./connexion');

async function initDB() {
    const connexion = await KNEX;
    if (!await connexion.schema.hasTable('user')){
        console.log('creation de la table user');
        await connexion.schema.createTable('user',table => {
            table.increments('id');
            table.string('nom');
            table.string('prenom');
            table.string('email');
            table.string('password');
            table.unique('id');
            table.unique('email');
        });

    }
    if (!await connexion.schema.hasTable('role')){
        console.log('creation de la table role');
        await connexion.schema.createTable('role',table => {
            table.increments('id');
            table.string('nom');
            table.unique(['id', 'nom']);
            table.unique('id');
            table.unique('nom');
        });
    }
    if (!await connexion.schema.hasTable('user_role')){
        console.log('creation de la table user_role');
        await connexion.schema.createTable('user_role',table => {
            table.integer('user_id');
            table.integer('role_id');
            table
            .foreign("user_id")
            .references("user.id")
            .onDelete("CASCADE");
            table
            .foreign("role_id")
            .references("role.id")
            .onDelete("CASCADE");
        });
    }
    
}
module.exports= {initDB};