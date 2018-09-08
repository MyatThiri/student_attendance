var express = require('express');
var router = express.Router();
var Subj = require('../../models/Subj');
var Dept = require('../../models/Dept');
var Teacher = require('../../models/Teacher');
var Timetable = require('../../models/Timetable');

router.get('/drawtimetable', function(req,res,next){
  Dept.find([],function(err,depts){
    if(err) next(err);
    Teacher.joinSubj({},function(err2,data){
      if(err2) next(err2);
      res.render('schedule/draw-timetable',{data:data, depts: depts});
    });
  });

});

router.post('/drawtimetable', function(req,res,next){
  var params = [req.body.dept,req.body.tname,req.body.subj,req.body.class,req.body.stime,req.body.etime,Number(req.body.date)];
  Timetable.add(params, function(err,timetable){
    if (err) next (err);
    req.flash('warn', 'Insert Success');
    res.redirect ('/schedule/viewtimetable/'+timetable.insertId);
  });
});

router.get('/viewtimetable/:id', function(req,res,next){
    Timetable.findById(req.params.id,function(err,timetable){
      if (err) throw err;
      console.log(timetable);
      if(timetable.length == 0) next (new Error ('Timetable data not found!'));
      res.render('schedule/view-timetable',{title:'Timetable View', timetable:timetable[0]});
    });
});

router.get('/timetablelist',function(req,res,next){
  var params = [req.body.dept,req.body.tname,req.body.subj,req.body.class,req.body.stime,req.body.etime,req.body.date];
  Timetable.find({params}, function(err,timetable){
    if (err) next (err);
    console.log(timetable);
      res.render('schedule/timetable-list', {timetable:timetable});
  });
});

router.get('/timetablemodify/:id', function(req,res,next){
  Dept.find([],function(err,depts){
    if(err) next (err);
    Teacher.joinSubj({},function(err2,teachers){
      if (err2) next (err2);
      Timetable.findById(req.params.id,function(err3,timetable){
        if (err3) next (err3);
        if(timetable.length == 0) next (new Error('Timetable data not found!'));
        res.render('schedule/timetable-modify', {title: 'Timetable View', timetable: timetable[0], teachers: teachers, depts:depts});
      });
    });
  })

});

router.post('/timetablemodify', function(req,res,next){
  var params = [req.body.dept,req.body.tname,req.body.subj,req.body.class,req.body.stime,req.body.etime,req.body.date,req.body.req.body.id];
  Timetable.findById(req.body.id,function(err,timetable){
    if (err) throw err;
    if(timetable.length == 0) next (new Error('Timetable data not found!'));
    Timetable.update(params,function(err2,ttimetable){
      if (err2) throw err2;
      req.flash('info', 'Success');
      res.redirect('/schedule/viewtimetable/'+req.body.id);
    });
  });
});

router.post ('/remove', function(req,res,next){
  Timetable.remove(req.body.id, function(err,timetable){
    if (err) throw err;
    req.flash('info', 'Successfully');
    res.redirect('/schedule/timetablelist');
  });
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
