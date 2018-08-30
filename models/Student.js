var db = require('../dbcon');
var bcrypt = require('bcrypt-nodejs');

var Student = {
  add: function(params,callback){
    var sql = 'INSERT INTO student (sid,name,email,gender,ph_number,department,class,password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    params[7] = bcrypt.hashSync(params[7],bcrypt.genSaltSync(8),null);
    return db.query(sql, params, callback);
  },

  findByEmail: function(email,callback){
    var sql = 'SELECT * FROM student WHERE id = ?';
    return db.query(sql, [email], callback);
  },

  findById: function(sid, callback) {
    var sql = "SELECT sid,name,email,gender,ph_number,department,class,DATE_FORMAT(updated, '%d/%m/%Y %H:%i') AS updated FROM student WHERE sid = ?";
    return db.query (sql, [sid], callback);
  },

  find: function(params, callback){
    // var p = [];
    var sql = "SELECT sid,name,email,gender, ph_number, department, class,DATE_FORMAT(updated, '%d/%m/%Y %H:%i') AS updated FROM student";
    return db.query(sql, params, callback);
  },
  compare:function(cleartext,encrypted){
    return bcrypt.compareSync(cleartext,encrypted);
  },
};
module.exports = Student;
