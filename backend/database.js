const mysql=require("mysql");
var connection=mysql.createConnection({
    host:"localhost",
    database:"goofy_geeks",
    user:"root",
    password:"mysql1234database"
});
module.exports=connection;