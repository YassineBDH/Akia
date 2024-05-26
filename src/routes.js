'use strict';
const express = require('express');
const router = express.Router();
const schemas = require('./schemas');
const { createUser, authenticateUser, getAllUsers, getUserById, deleteUserById} = require('./service/user');
const { validatorBody, validatorParams } = require('./middlewares/validator');
const auth = require("./middlewares/auth");

router.get('/user/:userId', validatorParams(schemas.params),async (req, res) => {
    try{
        const user = await getUserById(req, res);
    res.status(200).json(user);
        
    } catch(error){
        res.status(400).send(error.message);
    }
});
router.delete('/user/:userId', validatorParams(schemas.params),async (req, res) => {
    try{
        await deleteUserById(req, res);
    res.status(204);
        
    } catch(error){
        res.status(400).send(error.message);
    }
});
router.get("/user", async (req, res) => {
    try{
        const allUsers = await getAllUsers();
    res.status(200).json(allUsers);
        
    } catch(error){
        res.status(400).send(error.message);
    }
})

router.get("/user/info", auth, (req, res) =>{
    res.status(200).send(`utilisateur connecté est : ${req.currentUser.email}`);
})


router.post("/user/signup", validatorBody(schemas.bodySignup), async (req,res) => {
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
router.post("/user/signin", validatorBody(schemas.bodySignin), async (req,res) => {
    try{
        const authUser = await authenticateUser(req.body);
    res.status(200).json(authUser);
        
    } catch(error){
        res.status(400).send(error.message);
    }
});

module.exports = router;
