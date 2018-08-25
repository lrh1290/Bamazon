# Bamazon
A command-line storefront app with an interface for customers and employees. Built with NodeJS and MySQL.

## Installation
1. Clone this repository to your computer and install dependencies:
```bash
git clone https://www.github.com/adnanyousef/Bamazon.git 
cd Bamazon
npm install
```

2. Set up your MySQL credentials. Either open `connection.js` in your favorite text editor, or run the included `setup.js` script and choose the "Setup MySQL Credentials" option:
```bash
node setup.js
```
The `setup.js` script provides a simple and interactive interface in your terminal which will update `connection.js` for you. If your server runs the default MySQL hostname, port, username, and password, you can skip this step.

3. Set up the database by running the commands in `schema.sql` in your favorite MySql manager (ex. Sequel Pro), or run `node setup.js` and choose the "Set Up Database" option. This will get your database up and running, and fill it with some sample data.

4. Run the app with one of the following commands. Usage for each is documented below:
- `node bamazonCustomer.js`
- `node bamazonManager.js`
- `node bamazonSupervisor.js`

## Interfaces
### Customer
The `bamazonCustomer.js` file contains the interface intended for your customers.



## Todo
- [ ] Write "Supervisor" app
- [ ] Fix issue in Manager app with adding inventory
- [ ] Write documentation and installation instructions
- [ ] Create GIF/SVG demos