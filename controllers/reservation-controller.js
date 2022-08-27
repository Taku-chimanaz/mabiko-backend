import Reservation from './../Models/Reservation.js';
import {
    successHandlerFunction,
    internalErrHandlerFunction, 
    notFoundHandlerFunction
} from './../responses.js';


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



export default {
    getReservation,
    createReservation,
    updateReservation,
    deleteReservation,
    cancelReservation
}