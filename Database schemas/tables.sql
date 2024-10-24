Table: events
Columns:
eventid int AI PK 
title varchar(40) 
orgname varchar(45) 
venue varchar(45) 
date varchar(45) 
description varchar(50)
limit int 
timings varchar(45) 
orgemail varchar(45) 
accommodation varchar(45) 
type varchar(45)


Table: users
Columns:
id int AI PK 
Name varchar(25) 
Age int 
Email varchar(40) 
password varchar(25)

Table: organizers
Columns:
id int AI PK 
Name varchar(45) 
Age varchar(45) 
Email varchar(45) 
Password varchar(45)

Table :EventRegistration
CREATE TABLE `eventbridge`.`eventregistration` (
  `eventid` INT NOT NULL,
  `attname` VARCHAR(45) NOT NULL,
  `attemail` VARCHAR(45) NOT NULL,
  `accommodation` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  PRIMARY KEY (`eventid`));
