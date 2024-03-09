import mysql from 'mysql2'
const connection=mysql.createConnection({
    host:"localhost",
    database:"goofy_geeks",
    user:"root",
    password:""
});
// module.exports=connection;

export default connection;
