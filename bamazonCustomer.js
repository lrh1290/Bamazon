var con = require('./connection');
var inquirer = require('inquirer');
var chalk = require('chalk');
var Table = require('cli-table');
var log = console.log;

con.connect(function (err) {
  if (err) throw err;
  displayProducts();
});

function askToBuyMore() {
  inquirer.prompt([{
    type: 'confirm',
    message: 'Would you like to buy another item?',
    name: 'confirm',
  }]).then(function (answer) {
    if (answer.confirm) {
      displayProducts();
    } else {
      log(chalk.cyan.bold("\nBye! Come back again soon!"));
      process.exit(0);
    };
  });
};

function displayProducts() {
  log(chalk.cyan.underline("\nAvailable Products:\n"));
  con.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM products', function (err, res) {
    if (err) throw err;
    var productsTable = new Table({
      head: ['ID', 'Name', 'Department', 'Price', 'In Stock'],
      colWidths: [4, 30, 15, 10, 10]
    });
    for (var i = 0; i < res.length; i++) {
      productsTable.push([res[i].item_id, res[i].product_name, res[i].department_name, "$"+res[i].price, res[i].stock_quantity]);
    };
    log(productsTable.toString());
    console.log('');
    prompt(res.length);
  });
};

function prompt(numberOfItems) {
  inquirer.prompt([
    {
      type: 'input',
      message: "Enter the product ID you would like to buy. ('q' to exit)",
      name: 'id',
      validate: function (value) {
        if (value.toLowerCase() === 'q') {

          log(chalk.cyan.bold("\nBye! Come back again soon!"));
          process.exit(0);
        }
        if (isNaN(value) === false && parseInt(value) <= numberOfItems && parseInt(value) > 0) {
          return true;
        }
        return false;
      }
    }, {
      type: 'input',
      message: "How many units would you like to buy? ('q' to exit)",
      name: 'qty',
      validate: function (value) {
        if (value.toLowerCase() === 'q') {
          log(chalk.cyan.bold("\nBye! Come back again soon!"));
          process.exit(0);
        }
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      },
    }]).then(function (answer) {
      con.query("SELECT stock_quantity FROM products WHERE item_id=?", answer.id, function (err, res) {
        if (err) throw err;
        var qty = res[0].stock_quantity;
        if (qty >= answer.qty) {

          // Update database
          var qtyRemaining = qty - answer.qty;
          con.query("UPDATE products SET ? WHERE ?", [
            { stock_quantity: qtyRemaining }, { item_id: answer.id }
          ], function (err, res) {
            if (err) throw err;
            con.query("SELECT price, department_name FROM products WHERE item_id=?", [answer.id], function (err, res) {
              if (err) throw err;
              var total = answer.qty * res[0].price;
              var departmentName = res[0].department_name;
              log(chalk.green.bold('\nThanks for your order! Your total is ') + chalk.bold.green.underline('$' + total) + '.\n');

              // Added for the "supervisor.js" functionality
              updateSales(answer.id, total, departmentName);
              // End "supervisor.js" functionality

              askToBuyMore();
            });
          });

        } else {
          log(chalk.bgRed.white.bold("\nSorry!") + chalk.yellow(` We only have `) + chalk.yellow.underline(`${qty} in stock`) + chalk.yellow(` right now.\n`));
          askToBuyMore();
        };
      });
    });
};

// Function for the "supervisor.js" functionality
function updateSales(id, total, dept) {
  con.query(`UPDATE products SET product_sales=${total} WHERE item_id=${id};`, function(err,res){
    if (err) throw err;
    con.query(`UPDATE departments SET total_sales=total_sales+${total} WHERE department_name="${dept}";`, function(err,res){
      if (err) throw err;
    });
  });
};