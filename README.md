# Bamazon
A command-line storefront app with an interface for customers and employees. Built with NodeJS and MySQL.

## Installation

1. Clone this repository to your computer and install dependencies:
```
git clone https://www.github.com/adnanyousef/Bamazon.git 
cd Bamazon
npm install
```

2. Set up your MySQL credentials. Either open `connection.js` in your favorite text editor, or run the included `setup.js` script and choose the "Setup MySQL Credentials" option:
```
node setup.js
```

3. Set up the database by running the commands in `schema.sql` in your favorite MySql manager (ex. Sequel Pro), or run `node setup.js` and choose the "Create Database" option. This will get your database up and running, and fill it with some sample data.

4. Run the app with one of the following commands. Usage for each is documented below:
```
node bamazonCustomer.js
node bamazonManager.js
node bamazonSupervisor.js
```
---
### Installation demo:
<p align='center'>
<img width='650' src='images/install.svg'>
</p>

<!-- ![Install Demo](./images/install.svg) -->

## Interfaces
### Customer
The `bamazonCustomer.js` file contains the interface intended for your customers.

---
Demo:
![Customer Demo](./images/customer.svg)

## Todo
- [x] Write "Supervisor" app
- [ ] Fix issue with "Creating Database" in setup.js
- [ ] Write documentation and installation instructions
- [ ] Create GIF/SVG demos
