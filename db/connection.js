const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "pass",
  database: "employees"
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: 'localhost',
//     dialect: 'mysql',
//     port: 3306
//   }
// );
  
});




module.exports = connection;

