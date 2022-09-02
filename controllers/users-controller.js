import User from '../Models/Users.js';
import bcrypt from 'bcryptjs';
import {
    successHandlerFunction,
    internalErrHandlerFunction
} from '../responses.js';
import { privateKey } from '../privateKey.js';
import jwt from 'jsonwebtoken'


const signup = (req,res) => {
    
    const {password, email} = req.body;

    if(!(email && password)){
        return res.status(400).send({ error: "Data not formatted properly" });
    }


    const user = new User(req.body);
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password,salt);

    user.save()
    .then(user => {
        successHandlerFunction(res,user);
    })
    .catch(err => {
        internalErrHandlerFunction(res,err)
    })

};

const login = async (req,res)=>{

    const {password,email} = req.body;
    const user = await User.findOne({email});

    if(user){
        
        const correctPassword = await bcrypt.compare(password, user.password);

        if(correctPassword){

            user.password = null;
            const token = jwt.sign({id: user._id,email: user.email},privateKey,{expiresIn: "24h"});
            const responseData = {user,token}
            successHandlerFunction(res,responseData);

        }else {
            res.status(400).json({ error: "Invalid Password" });
        }

    }else  {
        res.status(401).json({ error: "User does not exist" });
    }
}

export default {
    signup,
    login
}