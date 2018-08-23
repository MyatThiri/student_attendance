var express = require('express');
var router = express.Router();
var Teacher = require('../../models/Teacher');

var users = require('./users');
// router.get('/plain', function(req,res,next){
//     res.render('plain_page',{title:'title'})
// });

router.get('/addteacher', function(req,res,next){
    res.render('admin/add-teacher')
});

router.post('/addteacher', function(req, res, next){
  console.log('call');
  var params = [req.body.id,req.body.name, req.body.email,req.body.gender,req.body.dept, req.body.number, req.body.password];
  Teacher.add(params, function(err,teacher){
    if(err) next (err);
    res.end ('Success');
    // res.render('admin/teacher-list', {title: 'Teacher List', teacher: teacher, search:{keyword: req.body.keyword, role: req.body.role}});
  });
  });

router.get('/teacherlist', function(req,res,next){
    res.render('admin/teacher-list');
});


router.get('/studentadd', function(req,res,next){
    res.render('admin/student-add')
});

router.get('/studentlist', function(req,res,next){
    res.render('admin/student-list')
});


router.get('/drawtimetable', function(req,res,next){
    res.render('admin/draw-timetable1')
});

router.get('/viewtimetable', function(req,res,next){
    res.render('admin/view-timetable')
});

router.get('/viewattendance', function(req,res,next){
    res.render('admin/view-attendance')
});

router.use('/users', users);

module.exports = router;
