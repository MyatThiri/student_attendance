var db = require('../dbcon');
var bcrypt = require('bcrypt-nodejs');

var Timetable = {
  add: function(params,callback){
    var sql = 'INSERT INTO timetable (dept_id,name,subj_name,class,start_time,end_time,date_id) VALUES (?,?,?,?,?,?,?)';
    return db.query(sql,params,callback);
  },
  findById:function(tb_id,callback){
    var sql ="SELECT dept_id, name, subj_name,class,start_time,end_time,date_id, DATE_FORMAT(updated, '%d/%m/%Y %H:%i') AS updated FROM timetable WHERE tb_id = ? ";
    return db.query(sql,[tb_id],callback);
  },

  find:function(tb_id,callback){
    var sql ="SELECT dept_id, name, subj_name,class,start_time,end_time,date_id, DATE_FORMAT(updated, '%d/%m/%Y %H:%i') AS updated FROM timetable";
    return db.query(sql,params,callback);
  },
}

module.exports = Timetable;
