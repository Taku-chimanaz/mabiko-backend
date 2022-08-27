import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const reservationSchema = new Schema({

    active: {
        type: Boolean,
        default: true
    },

    stateReason: {
        type: String,
        default: "Date Not Passed"
    },
    
    customerName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    peopleAttending: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    table: {
        type: Number,
        required: true
    }
},{timestamps: true});

const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;