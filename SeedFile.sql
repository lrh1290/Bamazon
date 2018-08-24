DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
 item_id INT NOT NULL AUTO_INCREMENT,
 product_name VARCHAR(45) NOT NULL,
 department_name VARCHAR(45) DEFAULT NULL,
 price DECIMAL(10,2) DEFAULT 10.00,
 stock_quantity INT DEFAULT 0,
 PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES
 ('MacBook', 'Electronics', 2000.00, 2),
 ('Surface Pro', 'Electronics', 1200.00, 4),
 ('PS4', 'Electronics', 350, 6),
 ('Xbox 1', 'Electronics', 400, 3),
 ('A Smarter Way To Learn JavaScript', 'Books', 30, 5),
 ('Eloquent JavaScript', 'Books', 20, 10),
 ('JavaScript: The Good Parts', 'Books', 25, 8),
 ('Tool Set', 'Hardware', 50, 20),
 ('Light Bulbs', 'Hardware', 5, 50),
 ('Protein Bars', 'Food', 10, 4),
 ('$50 Amazon Gift Card', 'Gift Cards', 50, 50);
 
SELECT * FROM products;
