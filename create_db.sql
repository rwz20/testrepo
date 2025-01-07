-- Create Database
CREATE DATABASE IF NOT EXISTS game_db;

-- Use the created database
USE game_db;

-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Store hashed password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Resources Table
CREATE TABLE IF NOT EXISTS resources (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    resource_type VARCHAR(50),
    quantity INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create Base Market Table
CREATE TABLE IF NOT EXISTS base_market (
    id INT AUTO_INCREMENT PRIMARY KEY,
    resource_type VARCHAR(50),
    base_price DECIMAL(10, 2),  -- Price of the resource (e.g., wood, crop, fish)
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
