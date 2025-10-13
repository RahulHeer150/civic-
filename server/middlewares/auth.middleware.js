const jwt = require('jsonwebtoken'); 
const User=require("../models/user.model")

/**
 * Middleware function to authenticate users based on JWT.
 * Assumes the token is passed in the Authorization header as 'Bearer <token>'.
 */
const authMiddleware = async (req, res, next) => {
    const token=req.header('authorization');

    if(!token){
        return res.status(401).json({message:"Unauthorized, Token is not provided"})
    }

    const jwtToken=token.replace('Bearer,"').trim();
    try{
        const isVerified=jwt.verify(jwtToken,process.env.JWT_SECRET);
        const userData=await User.findById(isVerified.userId).select({password:0});

        if(!userData){
            return res.status(401).json({message: "Unauthorized, User not found,"});
        }

        req.token=token;
        req.user=userData;
        next();
    }
    catch(error){
        return res.status(401).json({message: "Unauthorized, Invalid token."});
    }
};

module.exports =authMiddleware;
