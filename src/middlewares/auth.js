const jwt = require("jsonwebtoken");
const TOKEN_KEY =process.env.TOKEN_KEY;
const verifyToken = async(req, res, next) =>{
    const token = req.body.token || req.query.token ;
    if(!token){
        return res.status(403).send("autentification via en token est requis");
    }
    try {
        const decodedToken = await jwt.verify(token,TOKEN_KEY);
        req.currentUser = decodedToken;
    } catch (error) {
        return res.status(401).send("Token invalide");
    }
    return next();
};
module.exports = verifyToken;
