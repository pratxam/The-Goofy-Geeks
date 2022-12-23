import mysql from 'mysql2'
const connection=mysql.createConnection({
    host:"localhost",
    database:"the_goofy_geeks",
    user:"root",
    password:"mysql1234database"
});
// module.exports=connection;

export default connection;