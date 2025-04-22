DROP DATABASE IF EXISTS devbook;
CREATE DATABASE devbook ;
USE devbook;

-- tables

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role ENUM('admin','client') DEFAULT 'client',
    status ENUM('active','archived','suspended') DEFAULT 'active',
    email VARCHAR(100) UNIQUE NOT NULL,
    password  TEXT NOT NULL
);


CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);


CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(100),
    category_id INT,
    date_publication DATE ,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- pour suivi
CREATE TABLE user_books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    status ENUM('à lire', 'en cours', 'terminé') DEFAULT 'à lire',
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id),
    UNIQUE(user_id, book_id)
);


--  emprunts
CREATE TABLE loans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    book_id INT,
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (book_id) REFERENCES books(id)
);