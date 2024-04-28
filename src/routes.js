'use strict';
const express = require('express');
const router = express.Router();
const schemas = require('./schemas');
const { createUser } = require('./service/user');
const { validatorBody } = require('./middlewares/validator');


router.post("/signup", validatorBody(schemas.body), async (req,res) => {
    try{
        const createdUser = createUser(req.body)
        if (createdUser) {
            console.log('Utilisateur crée ');
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }

        
    } catch(error){
        res.status(400).send(error.message);
    }
})
module.exports = router;
