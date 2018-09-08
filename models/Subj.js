var db = require('../dbcon');

var Subj = {
  add: function(params,callback){
    var sql = 'INSERT INTO subject (subj_name,code,dept_id) VALUES ( ?, ?, ?)';
    return db.query(sql,params,callback);
  },
  findById: function(subj_id,callback){
    var sql = "SELECT s.subj_id, s.subj_name, s.code, s.dept_id, DATE_FORMAT(s.updated, '%d/%m/%Y %H:%i') AS updated, d.dept_name FROM subject AS s JOIN dept AS d USING(dept_id) WHERE s.subj_id = ?";
    return db.query (sql,[subj_id],callback);
  },

  find: function(params, callback){
    var sql = "SELECT s.subj_id, s.subj_name, s.code, s.dept_id, DATE_FORMAT(s.updated, '%d/%m/%Y %H:%i') AS updated, d.dept_name FROM subject AS s JOIN dept AS d USING(dept_id)";
    return db.query(sql, params,  callback);
  },

  update: function(params,callback){
    console.log(params);
    var sql = "UPDATE subject SET subj_name =? , code =? , dept_id =?,updated = NOW() WHERE subj_id = ?";
    return db.query(sql,params,callback);

  },
  remove: function(subj_id,callback){
    var sql = "DELETE FROM subject WHERE subj_id = ?";
    return db.query(sql, [subj_id], callback);
  },
};

module.exports = Subj;
