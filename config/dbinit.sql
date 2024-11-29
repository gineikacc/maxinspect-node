CREATE DATABASE IF NOT EXISTS maxinspect;

USE maxinspect;

CREATE TABLE IF NOT EXISTS Products (
    check_name VARCHAR(64),
    display_name VARCHAR(64),
    price INT NOT NULL,
    weight INT NOT NULL,
    calories FLOAT NOT NULL,
    protein FLOAT NOT NULL,
    carbs FLOAT NOT NULL,
    fats FLOAT NOT NULL,
    PRIMARY KEY (check_name, display_name)
);

CREATE TABLE IF NOT EXISTS Receipts (
    id INT PRIMARY KEY,
    owner_name VARCHAR(64),
    date_issued DATETIME NOT NULL,
    cost_total INT NOT NULL
);

CREATE TABLE IF NOT EXISTS Purchases (
    receipt_id INT,
    product_id VARCHAR(64),
    amount FLOAT NOT NULL,
    cost INT NOT NULL,
    PRIMARY KEY (receipt_id, product_id)
);


INSERT INTO Products (check_name, display_name, price, weight, calories, protein, carbs, fats) 
VALUES ('apple_1kg', 'Apple (1kg)', 300, 1000, 52, 0.3, 14, 0.2);

INSERT INTO Products (check_name, display_name, price, weight, calories, protein, carbs, fats) 
VALUES ('chicken_breast', 'Chicken Breast', 800, 0, 165, 31, 0, 3.6);

INSERT INTO Products (check_name, display_name, price, weight, calories, protein, carbs, fats) 
VALUES ('rice_1kg', 'White Rice (1kg)', 200, 1000, 365, 7.1, 80, 0.6);

INSERT INTO Products (check_name, display_name, price, weight, calories, protein, carbs, fats) 
VALUES ('almonds_500g', 'Almonds (500g)', 1500, 500, 579, 21, 22, 50);

INSERT INTO Products (check_name, display_name, price, weight, calories, protein, carbs, fats) 
VALUES ('carrot_loose', 'Carrot (Loose)', 50, 0, 41, 0.9, 10, 0.2);

INSERT INTO Products (check_name, display_name, price, weight, calories, protein, carbs, fats) 
VALUES ('milk_1l', 'Whole Milk (1L)', 120, 1000, 61, 3.3, 4.8, 3.3);

INSERT INTO Products (check_name, display_name, price, weight, calories, protein, carbs, fats) 
VALUES ('olive_oil_1l', 'Olive Oil (1L)', 2500, 1000, 884, 0, 0, 100);

INSERT INTO Products (check_name, display_name, price, weight, calories, protein, carbs, fats) 
VALUES ('potato_2kg', 'Potato (2kg)', 300, 2000, 77, 2, 17, 0.1);

INSERT INTO `Receipts`(`id`,`owner_name`,`date_issued`,`cost_total`) VALUES(12345678,'airolen11@gmail.com','2024-11-13 20:06:01',1234);
