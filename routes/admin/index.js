var express = require('express');
var router = express.Router();
var Teacher = require('../../models/Teacher');
var Student = require('../../models/Student');

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
    // TODO add messages
    res.redirect('/admin/teacher-list');
  });
});

router.get('/teacherlist', function(req,res,next){
  var params = [];
  console.log('list');
    Teacher.find(params, function(err,teacher){
      console.log(teacher);
      if (err) next (err);
      res.render('admin/teacher-list',{teacher:teacher});
    })

});


router.get('/studentadd', function(req,res,next){
    res.render('admin/student-add')
});

router.post ('/studentadd', function(req,res,next){
  var params = [req.body.id,req.body.name,req.body.email,req.body.gender,req.body.number,req.body.dept,req.body.class,req.body.password];
  Student.add(params, function(err,student){
    if(err) next (err);
  //TODO add messages
  res.redirect('/admin/studentlist');
  });
});

router.get('/studentlist', function(req,res,next){
  var params = [];
  console.log('list');
  Student.find(params, function(err,student){
    console.log(student);
    if(err) next (err);
    res.render('admin/student-list', {student:student});
  })
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
