const bcrypt = require("bcrypt");
const jwt = require ("jsonwebtoken");
const TOKEN_KEY =process.env.TOKEN_KEY;
const TOKEN_EXPIRY =process.env.TOKEN_EXPIRY

const hashData = async (data,saltRounds = 10) =>{
    try {
        const hashedData = await bcrypt.hash(data, saltRounds);
        return hashedData;
    }catch (error){
        throw error;
    }
};
const verifyHashedData = async (unhashed, hashed) =>{
    try{
        console.log(unhashed,hashed);
        const match = await bcrypt.compare(unhashed, hashed);
        return match;
    }catch(error){
        throw error;
    }
};
const createToken = async (tokenData,
    tokenKey = TOKEN_KEY,
    expiresIn = TOKEN_EXPIRY
) => {
    try {
        const token = await jwt.sign(tokenData,tokenKey,{
            expiresIn,
        });
        return token;
    } catch (error) {
        throw error;
    }
};
module.exports = { hashData, verifyHashedData, createToken};
