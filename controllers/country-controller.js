import Country from "../Models/Country.js";
import { success, internalErr } from "../responses.js";

const getAll = (req,res)=> {

    Country.find()
    .then(countries => {

        res.json({
            message: success,
            countries
        })
    })
    .catch(err => {

        res.status(500).json({
            message: internalErr,
            err: err.message
        })
    })
}

const addCountry = (req,res) => {

    const {name, branches} = req.body;

    new Country({
        name,
        branches
    }).save()
    .then(country => {

        res.json({
            message: success,
            country
        })
    })
    .catch(err => {

        res.status(500).json({
            message: internalErr,
            err: err.message
        })
    })
}

export default {
    getAll,
    addCountry
}