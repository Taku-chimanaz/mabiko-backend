import  jwt from 'jsonwebtoken';
import {privateKey} from './privateKey.js';

export const verifyToken = (req,res,next)=> {

    const token = req.headers.authorization;
    

    try {
        jwt.verify(token, privateKey);
        next();
    } catch (error) {
        res.status(403).json({
            message: "You are not authorised"
        })
    }
}