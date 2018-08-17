var express = require('express');
var router = express.Router();


router.get('/plain', function(req,res,next){
    res.render('plain_page')
});

router.get('/addteacher', function(req,res,next){
    res.render('admin/add-teacher')
});

router.get('/teacherlist', function(req,res,next){
    res.render('admin/teacher-list')
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
module.exports = router;
