var con = require('./connection');
var inquirer = require('inquirer');
var chalk = require('chalk');
var log = console.log;

con.connect(function (err) {
  if (err) throw err;
  main();
});

var commands = ['View Product Sales By Department', 'Create New Department', 'Exit'];

function main() {
  log('');
  inquirer.prompt([
    {
      message: chalk.green.bold.underline('Select command:'),
      name: 'command',
      type: 'list',
      choices: commands,
    }
  ]).then(function(answer){
    switch (answer.command) {
      case 'View Product Sales By Department':
        viewSales();
        break;
      case 'Create New Department':
        createNewDept();
        break;
      case 'Exit':
        log(chalk.cyan.bold('\nSigning off...'));
        process.exit(0);
    };
  });
};

viewSales() {
  log('');
};



createNewDept() {
  log('');
}
