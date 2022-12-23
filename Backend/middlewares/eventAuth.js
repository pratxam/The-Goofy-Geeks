import jwt from 'jsonwebtoken';
import { createCustomError } from '../errors/customError.js';

const eventAuth = async (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return next(createCustomError("Authentication Invalid", 401));
    }
    const token = authHeader.split(' ')[1];
    
    try {
        const payload = jwt.verify(token, "goofygeeks");
        req.user = {userId: payload.email};
        next();
    } catch (error) {
        return next(createCustomError("Authentication Invalid", 401)); 
    }
}

export default eventAuth;