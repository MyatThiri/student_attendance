var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('plain_page', { title: 'Express' });
});

/* GET signin page. */
router.get('/signup', function(req,res,next){
  res.render('common/signup', {title: 'Sign up'});
});

/* POST signup action */
router.post('/signup', function(req, res, next){
  var params = [req.body.name, req.body.email, req.body.password];
  User.findByEmail(req.body.email, function(err, rows){
    if (err) throw err;
    if (rows.length > 0) {
      req.flash('warn', 'Duplicated email!!!');
      res.redirect('/signup');
    } else {
      User.add(params, function(err2, result){
        if (err2) throw err2;
        res.render('common/signin');
      });
    }
  });
});

/* POST email duplication */
router.post('/dupemail', function(req, res, next){
  User.findByEmail(req.body.email, function(err, rows){
    if(err) throw err;
    if(rows.length > 0){
      res.json({ status: true, msg:'Duplicated email'});
    }else{
      res.json({ status: false})
    }
  });
});

/* GET signin page. */
router.get('/signin', function(req, res, next){
  res.render('common/signin', {title: 'Signin'});
});

/* POST signin page. */
 router.post('/signin', function(req, res, next) {
   User.findByEmail(req.body.email, function(err,users){
     if(err) next (err);
     if(users.length == 0 || !User.compare(req.body.password,users[0].password)){
       req.flash('warn', 'Email not exists or password not matched!!');
       res.redirect('/signin');
     }else{
       req.session.users = { uid:users[0].uid,uname:users[0].name, email:users[0].email }
       res.redirect('/');
     }
     });
   });
module.exports = router;
