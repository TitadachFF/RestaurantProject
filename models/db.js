const mysql = require('mysql');
const dbConfig = require("../config/db.config")


// create a connection to the database sever
const connection = mysql.createConnection({
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'foodpandy'
});

///open mysql connection
connection.connect((err)=>{
    if(err != null){
        console.log("err");
        return
    }
    console.log("Successfully connected to the database...");
})

module.exports = connection;