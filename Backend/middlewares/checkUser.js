import jwt from 'jsonwebtoken';
import { createCustomError } from '../errors/customError.js';

const checkUser = async (req, res, next)=>{
    const token = req.cookies.token
    const userId_cookie = req.cookies.userId
    const adminId_cookie = req.cookies.adminId
    console.log(token, userId_cookie, adminId_cookie);
    if(token==null || userId_cookie==null){
        res.redirect('/login')
    }
    else{
        try {
            const {userId} = jwt.verify(token, "goofygeeks");
            req.user = {userId: userId}
            console.log(userId, adminId_cookie, adminId_cookie != userId)
            if(userId_cookie != userId || (adminId_cookie && adminId_cookie != userId)) {
                res.redirect('/login')
            }
            next();
        } catch (error) {
            res.redirect('/login') 
        }
    }
}

export default checkUser;