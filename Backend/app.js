import express from 'express'
import path from 'path';
import cookieparser from 'cookie-parser'
const __dirname = path.resolve();
const app = express();


import cors from 'cors'
app.use(cors());

import mysql from 'mysql2'

import connection from './database.js';
import errorHandlerMiddleware from './middlewares/errorHandler.js';
import notFoundMiddleware from './middlewares/not-found.js';
import authRouter from './routes/authRoutes.js'
import eventRouter from './routes/eventRoutes.js'
import otherRouter from './routes/otherRoutes.js'
import checkUser from './middlewares/checkUser.js';


const port = 5000;
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieparser())
app.set('view engine', 'ejs');
app.use('/api/v1/auth',authRouter );
app.get('/login', (req,res)=>{
    res.render('login',{});
})

app.get('/signup', (req,res)=>{
    res.render('signup',{});
})
app.get('*',checkUser)
app.post('*',checkUser)
app.delete('*',checkUser)
app.patch('*',checkUser)

app.get('/',(req,res)=>{
    req.cookies.adminId
    res.render('home',{adminId:req.cookies.adminId})

})
app.get('/clubs/:id',(req,res)=>{
    res.render('clubs',{})

})

app.get('/register/:id',(req,res)=>{
    res.render('register',{})

})

app.get('/registrations',(req,res)=>{
    res.render('registrations',{})

})
app.get('/new',(req,res)=>{
    res.render('new',{})
})
app.get('/adminEvent',(req,res)=>{
    res.render('adminEvent',{})
})
app.use('/api/v1/event',eventRouter );
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