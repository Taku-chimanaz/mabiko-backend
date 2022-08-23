import Country from "../Models/Country.js";
import { success, internalErr, notFoundErr} from "../responses.js";

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

const addBranch = async (req,res) => {

    const {id, branches} = req.body;

    const country = await Country.findById(id);
    
    if(country){
        
        country.branches = [...country.branches, ...branches];
        const countrySaved = await country.save();

        if(countrySaved){
            res.json({
                message: success,
                country
            })
        }else {
            res.status(500).json({
                message: internalErr,
                countrySaved
            })
        }

    }else {

        res.status(404).json({
            message: notFoundErr,
        })
    }
}

export default {
    getAll,
    addCountry,
    addBranch
}