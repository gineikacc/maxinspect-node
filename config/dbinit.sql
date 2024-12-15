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

