var express = require('express');
var router = express.Router();
var Subj = require('../../models/Subj');

router.get('/drawtimetable', function(req,res,next){
    res.render('schedule/draw-timetable1')
});

router.get('/viewtimetable', function(req,res,next){
    res.render('schedule/view-timetable')
});

router.get('/addsubj', function(req,res,next){
  res.render('schedule/add-subj')
});

router.post ('/addsubj', function(req,res,next){
  var params = [req.body.name,req.body.id,req.body.code,req.body.dept];
  Subj.add(params, function(err,subj){
    if (err) next (err);
    res.end ('Success');
  });
});
module.exports = router;
