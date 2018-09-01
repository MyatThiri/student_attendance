var db = require('../dbcon');
var bcrypt = require('bcrypt-nodejs');

var Subj = {
  add: function(params,callback){
    var sql = 'INSERT INTO subject (subj_name,code,dept_id) VALUES (?, ?, ?)';
    return db.query(sql,params,callback);
  },

  findById: function(subj_id,callback){
    var sql = "SELECT subj_id,subj_name,code,dept_id,DATE_FORMAT(updated, '%d/%m/%Y %H:%i') AS updated FROM subject WHERE subj_id = ?";
    return db.query (sql,[subj_id],callback);
  },

}


module.exports = Subj;
