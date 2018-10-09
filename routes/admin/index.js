var express = require('express');
var router = express.Router();
var Teacher = require('../../models/Teacher');
var Student = require('../../models/Student');
var User = require('../../models/User');

var users = require('./users');


router.get('/home', function(req, res, next) {
  console.log('call');
  res.render('home', { title: 'Home Page' });
});

router.get('/addteacher', function(req,res,next){
    res.render('admin/add-teacher')
});

router.post('/addteacher', function(req, res, next){
  console.log('call');
  var params = [req.body.name, req.body.email,req.body.gender,req.body.dept, req.body.number, req.body.password];
  Teacher.add(params, function(err,teacher){
    if(err) next (err);
    // TODO add messages
    res.redirect('/admin/teacherlist');
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

router.get('/tview/:id', function(req,res,next){
  Teacher.findById(req.params.id,function(err,teacher){
    if(err) throw err;
    if(teacher.length == 0) next (new Error('Teacher data not found!'));
      res.render('admin/teacher-view',{title:'Teacher View',teacher: teacher[0]});
  });
});

router.get('/tmodify/:tid', function(req,res,next){
  Teacher.findById(req.params.tid,function(err,teacher){
    if (err) throw err;
    if(teacher.length == 0) next(new Error('Teacher data not found!'));
    res.render('admin/teacher-modify', {title: 'Teacher View', teacher: teacher[0]});
  });
});

router.post('/tmodify', function(req,res,next){
  var params = [req.body.name,req.body.email,req.body.gender,req.body.dept,req.body.number,req.body.tid];
  console.log('req.body.tid',req.body.tid);
  Teacher.findById(req.body.tid,function(err,teacher){
    if (err) throw err;
    console.log(teacher);
    if(teacher.length == 0) next(new Error('Teacher data not found!'));
    Teacher.update(params, function(teacherr,tteacher){
      if (teacherr) throw teacherr;
      req.flash('info', 'Success');
      res.redirect('/admin/tview/' + teacher[0].tid);
    });
  });
});

router.post('/remove', function(req,res,next){
  Teacher.remove(req.body.tid, function(err, teacher){
    if (err) throw err;
    req.flash('info', 'Successfully');
    res.redirect('/admin/teacherlist');
  });
});

router.get('/studentadd', function(req,res,next){
    res.render('admin/student-add')
});

router.post ('/studentadd', function(req,res,next){
  var params = [req.body.name,req.body.roll,req.body.email,req.body.gender,req.body.number,req.body.dept,req.body.class,req.body.password];
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

router.get('/sview/:id', function(req,res,next){
  Student.findById(req.params.id,function(err,student){
    if(err) throw err;
    if(student.length == 0) next (new Error('Student data not found!'));
      res.render('admin/student-view',{title:'Student View', student: student[0]});
  });
});

router.get('/smodify/:sid', function(req,res,next){
  Student.findById(req.params.sid,function(err,student){
    if (err) throw err;
    if(student.length == 0) next (new Error('Student data not found!'));
    res.render('admin/student-modify', {title: 'Student View', student: student[0]});
  });
});

router.post('/smodify', function(req,res,next){
  var params = [req.body.name,req.body.roll,req.body.email,req.body.gender,req.body.number,req.body.dept,req.body.class,req.body.sid];
  Student.findById(req.body.sid,function(err,student){
    if (err) throw err;
    if(student.length == 0) next (new Error('Student data not found!'));
    Student.update(params, function(studentt, sstudent){
      if(studentt) throw studentt;
      req.flash('info', 'Success');
      res.redirect('/admin/sview/' + student[0].sid);
    });
  });
});

router.post('/remove', function(req,res,next){
  Student.remove(req.body.sid,function(err,student){
    if (err) throw err;
    // req.flash('info', 'Successfully');
    res.redirect('/admin/studentlist');
  });
});

// Get View Timetable
router.get('/major', function(req,res,next){
    res.render('admin/major');
});

// Post View Timetable
router.post('/totalattendance',function(req,res,next){
  User.findRollCall(req.body.month,function (err,rtn) {
    if(err) next (err);
    res.render('admin/totlattendance',{title: 'Student View', list: rtn});
  });

});

router.use('/users', users);

module.exports = router;
