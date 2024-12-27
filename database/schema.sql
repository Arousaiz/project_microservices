CREATE SCHEMA `project_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `project_db`.`users` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(50) NULL DEFAULT NULL,
  `lastName` VARCHAR(50) NULL DEFAULT NULL,
  `username` VARCHAR(50) NULL DEFAULT NULL,
  `number` VARCHAR(15) NULL,
  `email` VARCHAR(50) NOT NULL,
  `passwordHash` VARCHAR(256) NOT NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `project_db`.`projects` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `userId` BIGINT NOT NULL,
  `title` VARCHAR(256) NULL DEFAULT NULL,
  `description` VARCHAR(1024) NULL DEFAULT NULL,
  `hours` FLOAT NOT NULL DEFAULT 0,
  `createdAt` FLOAT NOT NULL,
  `updatedAt` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_project_user`
    FOREIGN KEY (`userId`)
    REFERENCES `project_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `project_db`.`tasks` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `userId` BIGINT NOT NULL,
  `projectId` BIGINT NOT NULL,
  `title` VARCHAR(256) NULL DEFAULT NULL,
  `description` VARCHAR(1024) NULL DEFAULT NULL,
  `hours` FLOAT NOT NULL DEFAULT 0,
  `createdAt` FLOAT NOT NULL,
  `updatedAt` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_task_user`
    FOREIGN KEY (`userId`)
    REFERENCES `project_db`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_task_project`
    FOREIGN KEY (`projectId`)
    REFERENCES `project_db`.`projects` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION  
    );


