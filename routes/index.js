const express = require('express');
let router = express.Router();
const {GetLogin, DoLogin, Logout} = require('../controllers/Auth/Login');
const { GetSignUp, DoSignUp } = require('../controllers/Auth/SignUp');
const {GetForgotPassword, GetResetPassword,
        forgotPasswordEmail, DoResetPassword} = require('../controllers/Auth/ForgotPassword');
const {GetIndex, GetAllJobs, GetJobsCategoryAndSearch, JobDetail} = require('../controllers/Job/JobPublic');
const { ApplyJob } = require('../controllers/Job/JobFreelancer');

//Public routes
// GET requests
router.get('/', GetIndex);
router.get('/login', GetLogin);
router.get('/signup', GetSignUp);
router.get('/logout', Logout);
router.get('/forgot-password', GetForgotPassword);
router.get('/reset-password/:token/:email', GetResetPassword);
router.get('/jobs',GetAllJobs);
router.get('/job/:id', JobDetail);
router.get('/job-apply/:id', ApplyJob);

//POST requests
router.post('/signup', DoSignUp);
router.post('/login', DoLogin);
router.post('/forgot-password', forgotPasswordEmail);
router.post('/reset-password', DoResetPassword);
router.post('/jobs', GetJobsCategoryAndSearch);


module.exports = router;
