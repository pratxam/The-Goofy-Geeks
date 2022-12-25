const express=require("express");
const mysql =require("mysql");
var app=express();
var connection=require("./database.js")
app.get('/back',function (req,res) {
    let sql="select * from members";
    connection.query(sql,function(err,results){
        if(err) throw err;
        res.send(results);
    })
});
app.listen(5500,function(){
    console.log('App is listening on port 5500');
    connection.connect(function(err){
        if(err) throw err;
        console.log("Connected");
    })
});
