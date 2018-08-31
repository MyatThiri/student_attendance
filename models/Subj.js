var db = require('../dbcon');
var bcrypt = require('bcrypt-nodejs');

var Subj = {
  add: function(params,callback){
    var sql = 'INSERT INTO subject (subj_name,code,dept_id) VALUES (?, ?, ?)';
    params[2] = bcrypt.hashSync(params[2], bcrypt.genSaltSync(8), null);
    return db.query(sql,params,callback);
  },
}

module.exports = Subj;
