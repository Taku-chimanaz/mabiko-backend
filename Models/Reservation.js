import mongoose from 'mongoose';
const Schema = mongoose.Schema();

const reservationSchema = new Schema({

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
        type: time,
        required: true
    },

    people: {
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