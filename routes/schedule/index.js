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
  var params = [req.body.name,req.body.code,req.body.dept];
  Subj.add(params, function(err,subj){
    if (err) next (err);
    req.flash('warn', 'Insert Success');
    console.log(subj);
    res.redirect ('/schedule/subjview/'+subj.insertId);
  });
});

router.get('/subjview/:id', function(req,res,next){
  Subj.findById(req.params.id,function(err,subj){
    if (err) throw err;
    if(subj.length == 0) next (new Error('Subject data not found!'));
    console.log(subj[0]);
        res.render('schedule/subj-view',{title:'Subject View', subj:subj[0]});

  });
});

router.get('/subjlist', function(req,res,next){
  var params = [req.body.id,req.body.name,req.body.code,req.body.dept];
  Subj.find({params}, function(err,subj){
    console.log(subj);
    if (err) next (err);
    res.render('schedule/subj-list', {subj:subj});
  });
});

router.get('/subjmodify/:subj_id', function(req,res,next){
  Subj.findById(req.params.subj_id,function(err,subj){
    if (err) throw err;
    if(subj.length == 0) next (new Error('Subject data not found!'));
    res.render('schedule/subj-modify', {title: 'Subject View', subj: subj[0]});
  });
});

router.post('/subjmodify', function(req,res,next){
  var params = [req.body.name,req.body.code,req.body.dept,req.body.id];
  Subj.findById(req.body.id,function(err,subj){
    console.log('call first');
    if (err) throw err;
    if(subj.length == 0) next (new Error('Subject data not found!'));
    Subj.update(params, function(err2,ssubj){
      if(err2) throw err2;
      console.log('aaa',ssubj);
      req.flash('info', 'Success');
      res.redirect('/schedule/subjview/'+req.body.id);
    });
  });
});

router.post ('/remove', function(req,res,next){
  Subj.remove(req.body.id, function(err,subj){
    if (err) throw err;
    req.flash('info', 'Successfully');
    res.redirect('/schedule/subjlist');
  });
});

module.exports = router;