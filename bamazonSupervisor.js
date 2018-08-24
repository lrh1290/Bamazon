var con = require('./connection');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Table = require('cli-table');
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

function viewSales() {
  log('');
  con.query("SELECT * FROM departments;", function(err,res){

    var table = new Table({
      head: ['Dept ID', 'Dept Name', 'Overhead Costs', 'Product sales', 'Total profit'],
      colWidths: [9, 15, 16, 15, 14]
    });
    var totalProfit = [];
    for (var i = 0; i < res.length; i++) {

      totalProfit[i] = res[i].total_sales - res[i].over_head_costs;

      table.push([res[i].department_id, res[i].department_name, res[i].over_head_costs, res[i].total_sales, totalProfit[i]]);
    };
    log(table.toString());
    main();
  });
};


function createNewDept() {
  log('');
  inquirer.prompt([{
    name: 'department',
    message: 'Enter new department name:',
    validate: function (value) {
      if (value == '') {
        log(chalk.bgRed.white('ERROR:') + ' Please enter a department name');
        return false;
      }
      return true;
    },
  }, {
    name: 'overhead',
    message: 'Enter overhead costs:',
    validate: function (value) {
      if (isNaN(value) === false) {
        if (value == '') {
          return false;
        }
        return true;
      }
      return false;
    },
  }]).then(function(answer){
    con.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?);", [answer.department, parseFloat(answer.overhead)],function(err,res){
      if (err) throw err;
      log(chalk.cyan(`\nSuccessfully added new department: `) + chalk.cyan.bold.underline(`${answer.department}`) + '.');
      main();
    });
  });
};
