var fs = require('fs');
var inquirer = require('inquirer');
var chalk = require('chalk');
var con = require('./connection');

var commands = ['Setup MySQL Credentials', 'Create Database', 'Exit'];

console.log(chalk.cyan.bold('\nWelcome to Bamazon Setup!\n'));

function main() {
  inquirer.prompt([{
    message: "Please choose an option:",
    name: 'opt',
    type: 'list',
    choices: commands,
  }]).then(function (answer) {
    switch (answer.opt) {
      case commands[0]:
        setupCredentials(); break;
      case commands[1]:
        createDatabase(); break;
      case commands[2]:
        process.exit(0); break;
      default:
        main(); break;
    };
  });
};

main();

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

      main();

    });
  });
};

// Sets up database with proper tables and columns
// Also fills in example values for testing

function createDatabase() {
  fs.readFile('schema.sql', function(err,data){
    if (err) return console.log("\nERROR! Have you set up your MySQL credentials yet?");
    var schema = data.toString();
    console.log(schema);
    con.connect(function(err){
      if (err) throw err;
      con.query(schema, function(err,res){
        if (err) throw err;
        console.log(res);
        con.end();
      });
    });
  });
};
