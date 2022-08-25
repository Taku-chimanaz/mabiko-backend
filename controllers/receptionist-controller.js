import Receptionist from './../Models/Receptionist.js';
import bcrypt from 'bcryptjs';
import {
    successHandlerFunction,
    internalErrHandlerFunction,
    notFoundHandlerFunction
} from './../responses.js';


const signup = (req,res) => {
    
    const {password, email} = req.body;
    console.log(password, email)

    if(!(email && password)){
        return res.status(400).send({ error: "Data not formatted properly" });
    }


    const receptionist = new Receptionist(req.body);
    const salt = bcrypt.genSaltSync(10);
    receptionist.password = bcrypt.hashSync(password,salt);

    receptionist.save()
    .then(user => {
        successHandlerFunction(res,user);
    })
    .catch(err => {
        internalErrHandlerFunction(res,err)
    })

};

const login = async (req,res)=>{

    const {password,email} = req.body;
    console.table(req.body)
    const user = await Receptionist.findOne({email});

    if(user){
        console.log(user)
        const correctPassword = await bcrypt.compare(password, user.password);

        if(correctPassword){
            successHandlerFunction(res,user);
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