CREATE TABLE IF NOT EXISTS `db_sams`.`date` (
    `date_id` INT NOT NULL AUTO_INCREMENT,
    `date_name` DATE NOT NULL,
    PRIMARY KEY (`date_id`))
  ENGINE = InnoDB;

  INSERT INTO date(date_name)
  VALUES ('Monday'),
         ('Tuesday'),
         ('Wednesday'),
         ('Thursday'),
         ('Friday');
