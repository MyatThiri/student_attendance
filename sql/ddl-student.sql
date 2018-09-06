CREATE TABLE `db_sams`.`student` (
  `sid` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `gender` VARCHAR(10) NOT NULL,
  `ph_number` INT NOT NULL,
  `dept_id` INT NOT NULL REFERENCES dept(dept_id),
  `class` VARCHAR(15) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `inserted` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `insertedby` INT(11) NULL,
  `updatedby` INT(11) NULL,
  PRIMARY KEY (`sid`));
