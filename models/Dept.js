var db = require('../dbcon');

var Dept = {
  find: function(params, callback){
    var sql = "SELECT dept_id, dept_name FROM dept ";
    return db.query(sql, params,  callback);
  },
};

module.exports = Dept;
