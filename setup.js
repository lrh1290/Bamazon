var fs = require('fs');
var inquirer = require('inquirer');
var chalk = require('chalk');

var commands = ['Setup MySQL Credentials', 'Create Database', 'Exit'];

function main() {
  console.log(chalk.cyan.bold('\nWelcome to Bamazon Setup!\n'));
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

    fs.writeFile('connection1.js', fileContents, function(err){
      if (err) throw err;
      console.log(chalk.green.bold("\nCredentials saved!"));

      main();

    });
  });
};


