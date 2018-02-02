var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

//Google Callback Route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'  
  }
));

//Logout Route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

//Add Login/Logout UI
router.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

module.exports = router;
