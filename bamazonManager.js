var con = require('./connection');
var inquirer = require('inquirer');
var chalk = require('chalk');
var log = console.log;

con.connect(function (err) {
  if (err) throw err;
  main();
});

var commands = ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'];

function main() {
  log('');
  inquirer.prompt([
    {
      type: 'list',
      message: chalk.bgGreen('Select command:'),
      choices: commands,
      name: 'command',
    }
  ]).then(function(answer){
    switch(answer.command) {
      case 'View Products for Sale':
        // viewProducts();
        break;
      case 'View Low Inventory':
        // viewLowInventory();
        break;
      case 'Add to Inventory':
        // addToInventory();
        break;
      case 'Add New Product':
        // addNewProduct();
        break;
      case 'Exit':
        log(chalk.cyan.bold('\nSigning off...'));
        process.exit(0);
    };
  });
};
