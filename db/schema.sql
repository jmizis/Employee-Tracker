DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

USE employees;
 
 CREATE TABLE department (
    id int auto_increment primary key, 
    name varchar(30) unique not null
 );

 CREATE TABLE role (
    id int auto_increment primary key, 
    title varchar(30) unique not null,
    salary DECIMAL not null,
    department_id int not null
 );


 CREATE TABLE employees (
    id int auto_increment primary key, 
    first_name varchar(30) unique not null,
    last_name varchar(30) unique not null,
    role_id int not null,
    manager_id int
 );