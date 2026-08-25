CREATE DATABASE skillswap;

USE skillswap;

CREATE TABLE users(
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255),
    department VARCHAR(50),
    year INT
);