var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Teacher = require('../models/Teacher');
var Subj = require('../models/Subj');

/* GET plain page. */
router.get('/', function(req, res, next) {
  res.render('plain_page', { title: 'Plain Page' });
});

/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home Page' });
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
        res.redirect('/signin');
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
  var email = (req.cookies.email)?req.cookies.email:'';
  res.render('common/signin', {title: 'Signin', email:email});
});

/* POST signin page. */
 router.post('/signin', function(req, res, next) {
   User.findByEmail(req.body.email, function(err,admin){
     if(err) next (err);
     if(admin.length == 0 || !User.compare(req.body.password,admin[0].password)){
       req.flash('warn', 'Email not exists or password not matched!!');
       res.redirect('/signin');
     }else{
       req.session.users = { uid:admin[0].uid,uname:admin[0].name, email:admin[0].email }
       if(req.body.rememberme) res.cookie('email',admin[0].email, {maxAge:864008*7});
       else res.cookie('email', '', {maxAge: 0});
       res.redirect('/');
     }
     });
   });

   /* GET  signout*/
   router.get('/signout', function(req,res,next){
     req.session.destroy();
     res.redirect('/');
   });

module.exports = router;
