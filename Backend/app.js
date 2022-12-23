import express from 'express'
const app = express();


import cors from 'cors'
app.use(cors());

import mysql from 'mysql2'

import connection from './database.js';
import errorHandlerMiddleware from './middlewares/errorHandler.js';
import eventAuth from './middlewares/eventAuth.js';
import notFoundMiddleware from './middlewares/not-found.js';
import authRouter from './routes/authRoutes.js'
import eventRouter from './routes/eventRoutes.js'
import otherRouter from './routes/otherRoutes.js'


const port = 5000;

app.use(express.json());


app.use('/api/v1/auth',authRouter );
app.use('/api/v1/event',eventAuth, eventRouter );
app.use('/api/v1/', otherRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(port,function(){
    console.log(`App is listening on port ${port} `);
    connection.connect(function(err){
        if(err) throw err;
        console.log("Connected");
    })
});