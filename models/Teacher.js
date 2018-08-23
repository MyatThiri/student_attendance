var db = require('../dbcon');
var bcrypt = require('bcrypt-nodejs');

var Teacher = {
  add: function(params,callback){
    var sql = 'INSERT INTO teacher (tid,name, email, gender, department,ph_number,password) VALUES (?, ?, ?, ?, ?, ?, ?)';
    params[6] = bcrypt.hashSync(params[6],bcrypt.genSaltSync(8), null);
    return db.query(sql, params, callback);
  },
  findByEmail: function(email,callback){
    var sql = 'SELECT * FROM teacher WHERE id = ?';
    return db.query(sql, [email], callback);
  },

  find: function(params, callback){
    console.log('dbcall');
    var sql = "SELECT tid,name,email,gender,department,ph_number,DATE_FORMAT(updated, '%d/%m/%Y %H:%i') AS updated FROM teacher";
    return db.query(sql, params, callback);
  },
  compare:function(cleartext,encrypted){
    return bcrypt.compareSync(cleartext,encrypted);
  },
};
module.exports = Teacher;
