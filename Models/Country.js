import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const countrySchema = new Schema({

    name: {
        type: String,
        required: true
    },

    branches: {
        type: Array,
        required: true
    }
});

const Country = mongoose.model('Country', countrySchema);
export default Country;