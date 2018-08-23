var con = require('./connection');
var inquirer = require('inquirer');
var chalk = require('chalk');
var log = console.log;

con.connect(function (err) {
  if (err) throw err;
  displayProducts();
});

function displayProducts() {
  log(chalk.cyan.underline("\nAvailable Products:\n"));
  con.query('SELECT item_id, product_name, price FROM products', function (err, res) {
    if (err) throw err;
    log(chalk.black.bgYellow("ID") + " | " + chalk.black.bgYellow('Name') + " | " + chalk.black.bgYellow("Price"));
    for (var i = 0; i < res.length; i++) {
      log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price);
    };
    console.log('');
    prompt(res.length);
  });
};

function prompt(numberOfItems) {
  inquirer.prompt([
    {
      type: 'input',
      message: 'Enter the product ID you would like to buy.',
      name: 'id',
      validate: function (value) {
        if (isNaN(value) === false && parseInt(value) < numberOfItems) {
          return true;
        }
        return false;
      }
    }, {
      type: 'input',
      message: 'How many units would you like to buy?',
      name: 'qty',
      validate: function (value) {
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
            {stock_quantity: qtyRemaining}, {item_id: answer.id}
          ], function(err,res) {
            if (err) throw err;
            con.query("SELECT price FROM products WHERE item_id=?", [answer.id], function(err,res){
              if (err) throw err;
              var total = answer.qty * res[0].price;
              log(chalk.green('\nThanks for your order! Your total is ') + chalk.bold('$' + total) + '.');
            });
          });
          
        } else {
          log(chalk.bgRed.white.bold("\nSorry!") + ` We only have ` + chalk.yellow.bold.underline(`${qty} in stock`) + ` right now.`);
        };
      });
    });
};