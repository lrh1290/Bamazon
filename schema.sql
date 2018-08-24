DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(45) NOT NULL,
 department_name VARCHAR(45) NOT NULL,
 price DECIMAL(10,2) DEFAULT 10.00,
 stock_quantity INT DEFAULT 0,
 PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
 ('MacBook', 'Electronics', 2000.00, 2),
 ('Surface Pro', 'Electronics', 1200.00, 4),
 ('PS4', 'Electronics', 350, 6),
 ('Xbox 1', 'Electronics', 400, 5),
 ('Learn JavaScript Textbook', 'Books', 30, 5),
 ('Eloquent JavaScript', 'Books', 20, 10),
 ('JavaScript: The Good Parts', 'Books', 25, 8),
 ('Tool Set', 'Hardware', 50, 4),
 ('Light Bulbs', 'Hardware', 5, 50),
 ('Protein Bars', 'Food', 10, 10);

CREATE TABLE departments(
 department_id INT NOT NULL AUTO_INCREMENT,
 department_name VARCHAR(45) NOT NULL,
 over_head_costs INT(10) DEFAULT 0,
 total_sales INT(10) DEFAULT 0,
 PRIMARY KEY(department_id)
);

ALTER TABLE products ADD COLUMN
product_sales INT(20) DEFAULT 0;

INSERT INTO departments (department_name, over_head_costs)
VALUES
 ('Electronics', 1000),
 ('Books', 100),
 ('Hardware', 250),
 ('Food', 20);
