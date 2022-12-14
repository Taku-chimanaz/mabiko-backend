import Reservation from './../Models/Reservation.js';
import {
    successHandlerFunction,
    internalErrHandlerFunction, 
    notFoundHandlerFunction
} from './../responses.js';
import { businessEmail, password, jsonDB} from '../privateKey.js';
import nodemailer from 'nodemailer';


const getReservation = async(req,res) =>{

    const id = req.params.id;
    const reservation = await Reservation.findById(id);

    if(reservation){
        successHandlerFunction(res,reservation);
    }else {
        notFoundHandlerFunction(res);
    }
};


const createReservation = async(req,res)=> {

    const {
        customerName,
        email,
        date,
        time,
        peopleAttending,
        location,
        table
    }= req.body;


    new Reservation({
        customerName,
        email,
        date,
        time,
        peopleAttending,
        location,
        table
    }).save()
    .then(reservation => {
        successHandlerFunction(res, reservation)
    })
    .catch(err => {
        internalErrHandlerFunction(res,err)
    })
};

const updateReservation = (req,res) => {

    const {id, updateDetails} = req.body;

    Reservation.findByIdAndUpdate(id, updateDetails)
    .then(reservation => {
        successHandlerFunction(res,reservation)
    })
    .catch(err => {
        internalErrHandlerFunction(res,err)
    })
};

const cancelReservation = (req,res)=> {

    Reservation.findByIdAndUpdate(id, {active: false, stateReason: "canceled by customer"})
    .then(() => {
        successHandlerFunction(res,null)
    })
    .catch(err => {
        internalErrHandlerFunction(res,err)
    })
}

const deleteReservation  = (req,res)=>{

    const id = req.params.id;

    Reservation.findByIdAndDelete(id)
    .then(reservation => {
        successHandlerFunction(res,reservation)
    })
    .catch(err => {
        internalErrHandlerFunction(res,err)
    })
} 

const sendReservationCode = (req,res)=>{

    const {email} = req.body;

    // generate verification code;

    let randomCode = '';

    for(let i = 0; i < 4; i++){

        const randomNumber = Math.floor( Math.random() * 10);
        randomCode += `${randomNumber}`;

    }

    
    //  sending email

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: businessEmail,
            pass: password
        }
    });

    let mailDetails = {
        from: businessEmail,
        to: email,
        subject: 'Mabiko Restaurant Reservation Verification',
        html: `
            <div style="display: grid; place-items: center; margin-left: auto; margin-right: auto; background-color: #ED4962;height: 150px; width: 250px">

                <h3 style="color: white; text-align: center; margin-top: 1em">Verification Code</h3>
                <p style="background-color: white; width: 50%; margin: 1em auto; padding: .5em; text-align: center">${randomCode}</p>

            <div>
        `
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            internalErrHandlerFunction(res, err)
        } else {

            // save codes in json-db
            //  send response to user if saving was successfully
            
            jsonDB.push(`/${email}`, randomCode)
            .then(() => successHandlerFunction(res, data))
            .catch(err => internalErrHandlerFunction(res, err))
            
        }
    });
}

const verifyReservation = async (req,res)=> {

    const {email, code} = req.body;
    console.log(req.body)
    
    try {
        const savedCodeData = await jsonDB.getData(`/${email}`);
        
        if(savedCodeData === code){
            successHandlerFunction(res,null)
        }else {
            const err = {message: "wrong code"};
            internalErrHandlerFunction(res,err)
        }

    }catch(err){
        console.log("Something")
        internalErrHandlerFunction(res,err)
    }
}



export default {
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation,
    sendReservationCode,
    verifyReservation,
    sendReservationCode,
    verifyReservation,
    cancelReservation

}