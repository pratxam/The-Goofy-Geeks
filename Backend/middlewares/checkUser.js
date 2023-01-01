import jwt from 'jsonwebtoken';
import { createCustomError } from '../errors/customError.js';

const checkUser = async (req, res, next)=>{
    console.log('Checking user');
    const token = req.cookies.token
    const userId_cookie = req.cookies.userId
    const adminId_cookie = req.cookies.adminId
    if(!token || !userId_cookie){
        res.redirect('/login')
    }
    
    try {
        const {userId} = jwt.verify(token, "goofygeeks");
        console.log(userId, adminId_cookie, adminId_cookie != userId)
        if(userId_cookie != userId || (adminId_cookie && adminId_cookie != userId)) {
            res.redirect('/login')
        }
        next();
    } catch (error) {
        res.redirect('/login') 
    }
}

export default checkUser;