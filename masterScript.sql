CREATE DATABASE `photoPosting`;
USE `photoPosting`;

CREATE Table `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `user_name` VARCHAR(64) NOT NULL,
    `user_email` VARCHAR(64) NOT NULL,
    PRIMARY KEY(`user_id`)
);

CREATE TABLE `post`(
    `post_id` INT NOT NULL AUTO_INCREMENT,
    `post_title` VARCHAR(64),
    `user_id` INT,
    `pic_url` NVARCHAR(2083),
    `timestamp` TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (`post_id`)
);

CREATE TABLE `comment`(
    `com_id` INT NOT NULL AUTO_INCREMENT,
    `com_string` INT NOT NULL,
    `user_id` INT,
    `posted_on` INT NOT NULL,
    PRIMARY KEY(`com_id`)
);



