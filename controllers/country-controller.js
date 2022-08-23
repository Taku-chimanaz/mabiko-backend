import Country from "../Models/Country.js";

const getAll = (req,res)=> {

    Country.find()
    .then(countries => {

        res.json({
            message: "request successful",
            countries
        })
    })
    .catch(err => {

        res.status(500).json({
            message: "Something went wrong",
            err: err.message
        })
    })
}

export default {
    getAll
}