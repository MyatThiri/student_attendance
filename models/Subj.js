var db = require('../dbcon');

var Subj = {
  add: function(params,callback){
    var sql = 'INSERT INTO subject (subj_name,code,class,dept_id) VALUES ( ?, ?, ?, ?)';
    return db.query(sql,params,callback);
  },
  create: function (dbName,callback) {
    var sql = 'CREATE TABLE '+dbName+' (id INT AUTO_INCREMENT PRIMARY KEY ,stu_id INT(11), stu_name VARCHAR(45), count INT(45), date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, att_count INT(45), month INT(11))';
    console.log(sql);
    return db.query(sql,[dbName],callback);
  },
  createClass: function (dbName,majors,callback) {
    var sql = 'CREATE TABLE '+dbName+' (id INT AUTO_INCREMENT PRIMARY KEY ,stu_id INT(11), stu_name VARCHAR(45),'+majors+' month INT(11))';
    return db.query(sql,[dbName],callback);
  },
  insert: function (update,name,callback) {
    console.log('lllllllllllll',update);
    var sql = 'INSERT INTO '+ name +' (stu_id, stu_name, count, att_count) VALUES ?';
    console.log(sql);
    return db.query(sql,[update],callback);
  },
  insertDB: function (update,name,callback) {
    console.log('lllllllllllll',update);
    var sql = 'INSERT INTO '+ name +' (stu_id, stu_name,month) VALUES ?';
    console.log(sql);
    return db.query(sql,[update],callback);
  },
  findById: function(subj_id,callback){
    var sql = "SELECT s.subj_id, s.subj_name, s.code,s.class, s.dept_id, DATE_FORMAT(s.updated, '%d/%m/%Y %H:%i') AS updated, d.dept_name FROM subject AS s JOIN dept AS d USING(dept_id) WHERE s.subj_id = ?";
    return db.query (sql,[subj_id],callback);
  },
  findByClass: function(classN,callback){
    var sql = "SELECT subj_name FROM subject WHERE class = ?";
    return db.query (sql,[classN],callback);
  },

  find: function(params, callback){
    var sql = "SELECT s.subj_id, s.subj_name, s.code,s.class, s.dept_id, DATE_FORMAT(s.updated, '%d/%m/%Y %H:%i') AS updated, d.dept_name FROM subject AS s JOIN dept AS d USING(dept_id)";
    return db.query(sql, params,  callback);
  },

  update: function(params,callback){
    console.log(params);
    var sql = "UPDATE subject SET subj_name =? , code =? , class =? , dept_id =?,updated = NOW() WHERE subj_id = ?";
    return db.query(sql,params,callback);

  },
  remove: function(subj_id,callback){
    var sql = "DELETE FROM subject WHERE subj_id = ?";
    return db.query(sql, [subj_id], callback);
  },
};

module.exports = Subj;
