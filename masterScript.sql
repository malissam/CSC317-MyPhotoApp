CREATE DATABASE IF NOT EXISTS `photoPosting`;
USE `photoPosting`;

CREATE TABLE IF NOT EXISTS `user`(
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `password` varchar(50) NOT NULL,
    `user_name` VARCHAR(64) NOT NULL,
    `user_email` VARCHAR(64) NOT NULL,
    UNIQUE KEY `username_UNIQUE` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `post`(
    `post_id` INT NOT NULL AUTO_INCREMENT,
    `post_title` VARCHAR(64),
    `user_id` INT,
    `pic_url` VARCHAR(2083),
    `timestamp` TIMESTAMP DEFAULT NULL,
	UNIQUE KEY `postID_UNIQUE` (`post_id`)
);

CREATE TABLE IF NOT EXISTS `comment`(
    `com_id` INT NOT NULL AUTO_INCREMENT,
    `com_string` INT NOT NULL,
    `user_id` INT,
    `posted_on` INT NOT NULL,
	UNIQUE KEY `commentID_UNIQUE` (`com_id`)
);
