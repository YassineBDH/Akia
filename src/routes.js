'use strict';
const express = require('express');
const router = express.Router();
const schemas = require('./schemas');
const { createUser, authenticateUser } = require('./service/user');
const { validatorBody } = require('./middlewares/validator');


router.post("/signup", validatorBody(schemas.bodySignup), async (req,res) => {
    try{
        const createdUser =await createUser(req.body)
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
router.post("/signin", validatorBody(schemas.bodySignin), async (req,res) => {
    try{
        const authUser = await authenticateUser(req.body);
    res.status(200).json(authUser);
        
    } catch(error){
        res.status(400).send(error.message);
    }
});

module.exports = router;
