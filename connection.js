var mysql = require('mysql');

// Change these values
var con = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

module.exports = con;
