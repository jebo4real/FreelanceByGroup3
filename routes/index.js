const express = require('express');
let router = express.Router();
const {GetLogin, DoLogin, Logout} = require('../controllers/Auth/Login');
const { GetSignUp, DoSignUp } = require('../controllers/Auth/SignUp');
const {GetForgotPassword, GetResetPassword,
        forgotPasswordEmail, DoResetPassword} = require('../controllers/Auth/ForgotPassword');
const {GetIndex, GetAllJobs, GetPageAllJobs, GetJobsCategoryAndSearch, GetJobsFilter, JobDetail} = require('../controllers/Job/JobPublic');
const { ApplyJob } = require('../controllers/Job/JobFreelancer');
const {GetVerify, DoVerification, SendVerificationAgain, NotVerified} = require('../controllers/Auth/Verify');
const {GetHowItWorks} = require('../controllers/Public');
const { GetFreelancers, GetSingleFreelancer, GetFreelancerCountryAndSearch } = require('../controllers/Freelancer/FreelancersPublic');

//Public routes
// GET requests

router.get('/freelancers', GetFreelancers);
router.get('/freelancer/:id', GetSingleFreelancer);
router.get('/', GetIndex);
router.get('/how-it-works', GetHowItWorks);
router.get('/login', GetLogin);
router.get('/signup', GetSignUp);
router.get('/logout', Logout);
router.get('/forgot-password', GetForgotPassword);
router.get('/reset-password/:token/:email', GetResetPassword);
router.get('/verify', GetVerify);
router.get('/send-verification', SendVerificationAgain);
router.get('/verification/:email/:token', DoVerification);




router.get('/jobs',GetAllJobs);
router.get('/jobs/:page',GetPageAllJobs);
router.get('/job/:id', JobDetail);
router.get('/job-apply/:id', ApplyJob);

//POST requests
router.post('/signup', DoSignUp);
router.post('/login', DoLogin);
router.post('/forgot-password', forgotPasswordEmail);
router.post('/reset-password', DoResetPassword);
router.post('/jobs', GetJobsCategoryAndSearch);
router.post('/freelancers', GetFreelancerCountryAndSearch);
router.post('/filter-jobs', GetJobsFilter);

module.exports = router;
