var db = require('../dbcon');
var bcrypt = require('bcrypt-nodejs');

var User = {
  add: function(params,callback){
    var sql = 'INSERT INTO admin (name, email, password) VALUES (?, ?, ?)';
    params[2] = bcrypt.hashSync(params[2], bcrypt.genSaltSync(8), null);
    return db.query(sql, params, callback);
  },
  findByEmail: function(email,callback){
    var sql = 'SELECT * FROM admin WHERE email = ?';
    return db.query(sql, [email], callback);
  },
  compare:function(cleartext,encrypted){
    return bcrypt.compareSync(cleartext,encrypted);
  },
  findRollCall: function(month,callback){
    var sql = 'select stu_name,stu_id,(COD_count+CC_count+ES_count+ACNII_count+DSP_count+DIP_count+WEB_count+English_count) as overall,month,(COD_acount+CC_acount+ES_acount+ACNII_acount+DSP_acount+DIP_acount+WEB_acount+English_acount) as total from 5beit where month= ?';
    return db.query(sql,[month],callback);
  },
};

module.exports = User;
