var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET signin page. */
router.get('/signup', function(req,res,next){
  res.render('common/sign-up', {title: 'Sign up'});
});
module.exports = router;
