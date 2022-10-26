const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "employees"

  
});




module.exports = connection;

