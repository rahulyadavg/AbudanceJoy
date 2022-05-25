CREATE TABLE users (
  user_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  user_first varchar(256) not null,
  user_last varchar(256) not null,
  user_email varchar(256) not null,
  user_uid varchar(256) not null,
  user_pwd varchar(256) not null
);

INSERT INTO users (user_first, user_last, user_email, user_uid, user_pwd)
VALUES('Rahul', 'Yadav', 'rahulg1099@gmail.com', 'Admin', 'test123');





INSERT INTO products (category_id, subcategory_id, body)
VALUES(1, 1, '');






create database abudancejoy;


CREATE TABLE users (
  user_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  name varchar(256) not null,
  phone varchar(10) not null,
  email varchar(256) not null,
  password varchar(256) not null
);


CREATE TABLE products (
  product_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  category_id int(11) not null,
  subcategory_id int(10) not null,
  body varchar(1024) not null,
  city varchar(256) not null
);

