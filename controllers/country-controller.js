import Country from "../Models/Country.js";
import {
    internalErrHandlerFunction,
    notFoundHandlerFunction,
    successHandlerFunction} from "../responses.js";

const getAll = (req,res)=> {

    Country.find()
    .then(countries => {   
        successHandlerFunction(res,countries)
    })
    .catch(err => {
       internalErrHandlerFunction(res,err)
    })
}

const addCountry = (req,res) => {

    const {name, branches} = req.body;

    new Country({
        name,
        branches
    }).save()
    .then(country => {
        successHandlerFunction(res,country)
    })
    .catch(err => {
        internalErrHandlerFunction(res,err)
    })
}



const addBranch = async (req,res) => {

    const {id, branches} = req.body;

    const country = await Country.findById(id);
    
    if(country){
        
        country.branches = [...country.branches, ...branches];
        const countrySaved = await country.save();

        if(countrySaved){
            successHandlerFunction(res,countrySaved)
        }else {  
            internalErrHandlerFunction(res,null)
        }

    }else {
        notFoundHandlerFunction(res)     
    }
}


const removeBranch = async (req,res)=> {

    const {id, branch} = req.body;

    const country = await Country.findById(id);

    if(country){

        country.branches = country.branches.filter(countryBranch => countryBranch !== branch);
        const countrySaved = await country.save();

        if(countrySaved){
            successHandlerFunction(res,countrySaved)
        }else {
            internalErrHandlerFunction(res,null)
        }

    }else {
        notFoundHandlerFunction(res)
    }
}


const deleteCountry = (req,res)=> {

    const id = req.params.id;

    Country.findByIdAndDelete(id)
    .then(country => {
        successHandlerFunction(res,country)
    })
    .catch(err => {
        internalErrHandlerFunction(res,err)
    })
}

export default {
    getAll,
    addCountry,
    addBranch,
    removeBranch,
    deleteCountry
}