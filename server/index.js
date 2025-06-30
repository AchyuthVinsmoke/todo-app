import express from 'express';
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';


dotenv.config();

const app = express() 
/* we imported express function 
it returns an server 
application object which 
has server methods and things
 what server does */

 app.use(cors());
 app.use(express.json());

 import todoRoutes from './routes/todoRoutes.js';
 app.use('/api/todos',todoRoutes);

 mongoose.connect(process.env.MONGO_URL)
 .then(()=> console.log('mongoose connected'))
 .catch((err)=> console.error('db error',err))

app.get('/',(req,res) => {
    res.send('api is running ');
});

const PORT = process.env.PORT || 5000;
app.listen(5000,()=> {
    console.log(`server is running on ${PORT}`)
});