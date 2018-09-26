CREATE TABLE `db_sams`.`subject` (
  `subj_id` INT NOT NULL AUTO_INCREMENT,
  `subj_name` VARCHAR(45) NOT NULL,
  `code` VARCHAR(45) NOT NULL,
  `class` VARCHAR(15) NOT NULL,
  `dept_id` INT NOT NULL REFERENCES dept(dept_id),
  `inserted` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `insertedby` INT(11) NULL,
  `updatedby` INT(11) NULL,
  PRIMARY KEY (`subj_id`));
  -- -----------------------------------------------------
  -- Table `db_sams`.`dept`
  -- -----------------------------------------------------
  CREATE TABLE IF NOT EXISTS `db_sams`.`dept` (
     `dept_id` INT NOT NULL AUTO_INCREMENT,
     `dept_name` VARCHAR(45) NULL,
     PRIMARY KEY (`dept_id`))
   ENGINE = InnoDB;

   INSERT INTO dept (dept_name)
 VALUES ('IT'),
 ('Civil'),
 ('EC'),
 ('EP'),
 ('MP'),
 ('MC'),
 ('Eng'),
 ('Math'),
 ('Phyc'),
 ('Chem'),
 ('Myan');
