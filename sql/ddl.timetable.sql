CREATE TABLE `db_sams`.`timetable` (
  `tb_id` INT NOT NULL AUTO_INCREMENT,
  `dept_id` INT NOT NULL,
  `subj_name` VARCHAR(45) NOT NULL,
  `class` VARCHAR(15) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `time` VARCHAR(45) NOT NULL,
  `date_id` INT NOT NULL,
  `inserted` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `insertedby` INT(11) NULL,
  `updatedby` INT(11) NULL,
  PRIMARY KEY (`tb_id`));
