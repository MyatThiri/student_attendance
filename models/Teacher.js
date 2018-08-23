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
    var t = []
    var sql = "SELECT tid,name,email,DATE_FORMAT(updated, '%d/%m/%Y %H:%i') AS updated FROM teacher";
    // if(params[0] != '' || params[1] != '')
    // {
    //   sql += " WHERE";
    //   if(params[0] != ''){
    //     sql += " (name LIKE concat('%',?,'%') OR email LIKE concat ('%',?,'%') )";
    //     t.push(params[0]);
    //     t.push(params[0]);
    //     if(params[1] != '') sql += " AND";
    //   }
    //   if(params[1] != ''){
    //     sql += " role = ?";
    //     t.push(params[1]);
    //   }
    // }
    // return db.query(sql, t, callback);
  },
  compare:function(cleartext,encrypted){
    return bcrypt.compareSync(cleartext,encrypted);
  },
};
module.exports = Teacher;
