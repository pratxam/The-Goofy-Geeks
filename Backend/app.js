import express from 'express'
const app = express();
import dotenv from 'dotenv';
dotenv.config();

import mysql from 'mysql2'

import connection from './database.js';
import errorHandlerMiddleware from './middlewares/errorHandler.js';
import eventAuth from './middlewares/eventAuth.js';
import notFoundMiddleware from './middlewares/not-found.js';
import authRouter from './routes/authRoutes.js'
import eventRouter from './routes/eventRoutes.js'


const port = process.env.PORT || 5500

app.use(express.json());


app.use('/api/v1/auth',authRouter );
app.use('/api/v1/event',eventAuth, eventRouter );

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port,function(){
    console.log('App is listening on port 5500');
    connection.connect(function(err){
        if(err) throw err;
        console.log("Connected");
    })
});