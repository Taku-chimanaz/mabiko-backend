import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import countryRoutes from './routes/country-routes.js'

const app = express();

// Middlewares

app.use(cors());


// DB Connection

const localDB = 'mongodb://localhost:27017/mabiko';

mongoose.connect(localDB, err => {
    
    if(err){
        console.log(error)
    }else {
        app.listen(5000, () => console.log("DB connected\nListening at port 5000"))
    }
})

// Routes

app.get('/', (req,res) => res.json({message: "Mabiko API"}));
app.use('/api/country', countryRoutes);
