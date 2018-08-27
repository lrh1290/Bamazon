var fs = require('fs');
var inquirer = require('inquirer');
var chalk = require('chalk');

console.log(chalk.cyan.bold('\nWelcome to Bamazon Setup!\n'));

// Creates connection.js with MySQL credentials (overwrites if exists)
function setupCredentials() {
  inquirer.prompt([{
    message: 'Enter your MySQL hostname:',
    name: 'hostname',
    default: 'localhost',
  }, {
    message: 'Enter your MySQL port:',
    name: 'port',
    default: 8889,
  }, {
    message: 'Enter your MySQL username:',
    name: 'username',
    default: 'root',
  }, {
    message: 'Enter your MySQL password',
    name: 'password',
    type: 'password',
    default: 'root',
  }
  ]).then(function (answer) {
    var fileContents = 
    `var mysql = require("mysql");\n
var con = mysql.createConnection({
  host: "${answer.hostname}",
  port: ${parseInt(answer.port)},
  user: "${answer.username}",
  password: "${answer.password}",
  database: "bamazon"
});\n
module.exports = con;\n`;

    fs.writeFile('connection.js', fileContents, function(err){
      if (err) throw err;
      console.log(chalk.green.bold("\nCredentials saved!"));


    });
  });
};

setupCredentials();
