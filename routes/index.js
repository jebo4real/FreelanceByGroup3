const express = require('express');
let router = express.Router();
const {GetLogin, DoLogin, Logout} = require('../controllers/Auth/Login');
const { GetSignUp, DoSignUp } = require('../controllers/Auth/SignUp');
const {GetForgotPassword, GetResetPassword,
        forgotPasswordEmail, DoResetPassword} = require('../controllers/Auth/ForgotPassword');

//Public routes
// GET requests
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', GetLogin);
router.get('/signup', GetSignUp);
router.get('/logout', Logout);
router.get('/forgot-password', GetForgotPassword);
router.get('/reset-password/:token/:email', GetResetPassword);
// router.get('/jobs');
// router.get('/jobs/:id');

//POST requests
router.post('/signup', DoSignUp);
router.post('/login', DoLogin);
router.post('/forgot-password', forgotPasswordEmail);
router.post('/reset-password', DoResetPassword);


module.exports = router;
