CREATE TABLE db_SAMS.teacher (
  tid INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(128) NOT NULL,
  gender VARCHAR(15) NOT NULL,
  department VARCHAR(15) NOT NULL,
  ph_number INT NOT NULL,
  password VARCHAR(128) NOT NULL,
  inserted DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  insertedby DATETIME NULL,
  updatedby DATETIME NULL,
  PRIMARY KEY (tid),
  UNIQUE INDEX tid_UNIQUE (tid ASC));