var con = require('./connection');
var inquirer = require('inquirer');
var chalk = require('chalk');
var log = console.log;

con.connect(function (err) {
  if (err) throw err;
  main();
});

var commands = ['View Products For Sale', 'View Low Inventory', 'Add To Inventory', 'Add New Product', 'Exit'];

function main() {
  log('');
  inquirer.prompt([
    {
      type: 'list',
      message: chalk.green.bold.underline('Select command:'),
      choices: commands,
      name: 'command',
    }
  ]).then(function (answer) {
    switch (answer.command) {
      case 'View Products For Sale':
        viewProducts();
        break;
      case 'View Low Inventory':
        viewLowInventory();
        break;
      case 'Add To Inventory':
        addToInventory();
        break;
      case 'Add New Product':
        addNewProduct();
        break;
      case 'Exit':
        log(chalk.cyan.bold('\nSigning off...'));
        process.exit(0);
    };
  });
};

function viewProducts() {
  log(chalk.cyan.underline("\nProducts For Sale:\n"));
  con.query('SELECT item_id, product_name, price, stock_quantity FROM products', function (err, res) {
    if (err) throw err;
    log(chalk.black.bgYellow("ID") + " | " + chalk.black.bgYellow('Name') + " | " + chalk.black.bgYellow("Price") + " | " + chalk.black.bgYellow("Quantity"));
    for (var i = 0; i < res.length; i++) {
      log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
    };
    main();
  });
};

function viewLowInventory() {
  log(chalk.cyan.underline("\nLess than 5 units in stock:\n"));
  con.query('SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity<5', function (err, res) {
    if (err) throw err;
    log(chalk.black.bgYellow("ID") + " | " + chalk.black.bgYellow('Name') + " | " + chalk.black.bgYellow("Price") + " | " + chalk.black.bgYellow("Quantity"));
    for (var i = 0; i < res.length; i++) {
      log(res[i].item_id + " | " + res[i].product_name + " | " + "$" + res[i].price + " | " + res[i].stock_quantity);
    };
    main();
  });
};

function addToInventory() {
  con.query('SELECT item_id, product_name, stock_quantity FROM products', function (err, res) {
    if (err) throw err;

    var itemNames = [];
    for (var i = 0; i < res.length; i++) {
      itemNames.push(res[i].product_name);
    };

    inquirer.prompt([
      {
        type: 'list',
        choices: itemNames,
        message: 'Which product would you like to add inventory to?',
        name: 'product'
      }, {
        type: 'input',
        message: 'How many units to add?',
        name: 'units',
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      }
    ]).then(function (answer) {
      var productToAdd = answer.product;
      var amountToAdd = parseInt(answer.units);

      con.query('UPDATE products SET ? WHERE ?', [
        { stock_quantity: amountToAdd },
        { product_name: productToAdd }
      ], function (err, res) {
        if (err) throw err;
        log(chalk.bold.cyan(`\nAdded ${amountToAdd} units to ${productToAdd}.`));
        main();
      });
    });
  });
};

function addNewProduct() {
  log('');
  inquirer.prompt([
    {
      message: 'Name of new product:',
      name: 'name',
      validate: function (value) {
        if (value == '') {
          log(chalk.bgRed.white('ERROR:') + ' Please enter a name');
          return false;
        }
        return true;
      },
    }, {
      message: 'Price of new product:',
      name: 'price',
      validate: function (value) {
        if (isNaN(value) === false) {
          if (value == '') {
            return false;
          }
          return true;
        }
        return false;
      },
    }, {
      message: 'Starting inventory:',
      name: 'inventory',
      validate: function (value) {
        if (isNaN(value) === false) {
          if (value == '') {
            return false;
          }
          return true;
        }
        return false;
      },
    }, {
      message: 'Department of new product (optional):',
      name: 'department',
    }
  ]).then(function (answer) {
    var name = answer.name;
    var price = parseInt(answer.price);
    var inventory = parseInt(answer.inventory);
    if (department == '') {
      con.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${name}", NULL, ${price}, ${inventory});`, function (err, res) {
        if (err) throw err;
        log(chalk.cyan.bold(`\nAdded ${inventory} units of ${name} at $${price} each.`));
        main();
      });
    } else {
      var department = answer.department;
      con.query(`INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("${name}", "${department}", ${price}, ${inventory});`, function (err, res) {
        if (err) throw err;
        log(chalk.cyan.bold(`\nAdded ${inventory} units of ${name} at $${price} each.`));
        main();
      });
    };
  });
};