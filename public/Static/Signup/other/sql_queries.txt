-- contact_us table
CREATE TABLE contact_us (
  id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  name varchar(256) not null,
  email varchar(256) not null,
  contact number(10) not null,
  comment varchar(256) not null
);


-- enquiry table
CREATE TABLE enquiry (
  enquiry_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  name varchar(256) not null,
  email varchar(256) not null,
  location varchar(256) not null,
  subject varchar(256) not null,
  body varchar(256) not null,
  contact number(10) not null
);


-- feedback table
CREATE TABLE feedback (
  feedback_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  message varchar(256) not null,
  email varchar(256) not null
);


-- products table
CREATE TABLE products (
  product_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  category_id int not null,
  subcategory_id int not null,
  body varchar(256) not null,
  city varchar(256) not null,
  vendor_id int not null
);


-- report table
CREATE TABLE report (
  report_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  name varchar(256) not null,
  phone int(10) not null,
  email varchar(256) not null,
  age int not null,
  message varchar(256) not null
);


-- requests table
CREATE TABLE requests (
  request_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  user_id int not null,
  vendor_id int not null,
  product_id int not null,
  request_date date not null,
  request_time time not null
);


-- suggestions table
CREATE TABLE suggestions (
  suggestion_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  name varchar(256) not null,
  phone int(10) not null,
  email varchar(256) not null,
  age int not null,
  message varchar(256) not null
);


-- users table
CREATE TABLE users (
  user_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  name varchar(256) not null,
  phone int(10) not null,
  email varchar(256) not null,
  password varchar(256) not null
);


-- vendor table
CREATE TABLE vendor (
  user_id int(11) AUTO_INCREMENT  PRIMARY KEY not null,
  name varchar(256) not null,
  phone int(10) not null,
  email varchar(256) not null,
  password varchar(256) not null
);

