var db = require('../dbcon');
var bcrypt = require('bcrypt-nodejs');

var Teacher = {
  add: function(params,callback){
    var sql = 'INSERT INTO teacher (name, email, gender, dept_id ,ph_number,password) VALUES ( ?, ?, ?, ?, ?, ?)';
    params[5] = bcrypt.hashSync(params[5],bcrypt.genSaltSync(8), null);
    return db.query(sql, params, callback);
  },
  findByEmail: function(email,callback){
    var sql = 'SELECT * FROM teacher WHERE id = ?';
    return db.query(sql, [email], callback);
  },

  findById: function(tid,callback){
    var sql = "SELECT t.tid, t.name, t.email, t.gender, t.dept_id, t.ph_number, DATE_FORMAT(t.updated, '%d/%m/%Y %H:%i') AS updated, d.dept_name FROM teacher AS t JOIN dept AS d USING(dept_id) WHERE t.tid = ?";
    console.log(sql, tid);
    return db.query (sql, [tid], callback);
  },

  find: function(params, callback){
    console.log('dbcall');
    var sql = "SELECT t.tid, t.name, t.email, t.gender, t.dept_id, t.ph_number, DATE_FORMAT(t.updated, '%d/%m/%Y %H:%i') AS updated, d.dept_name FROM teacher AS t JOIN dept AS d USING(dept_id)";
    return db.query(sql, params, callback);
  },

  update: function(params, callback){
    var sql = "UPDATE teacher SET name =?,email =?,gender =?,dept_id =?,ph_number =?,updated = NOW() WHERE tid = ?";
    return db.query(sql, params, callback);
  },

  remove: function(tid, callback) {
    var sql = "DELETE FROM teacher WHERE tid = ?";
    return db.query(sql, [tid], callback);
  },

  compare:function(cleartext,encrypted){
    return bcrypt.compareSync(cleartext,encrypted);
  },
};
module.exports = Teacher;
