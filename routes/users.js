const express = require('express');
let router = express.Router();
const {GetProfile, UpdateProfile} = require('../controllers/Profile/Profile');
const {GetChangePassword, UpdatePassword} = require('../controllers/Profile/Password');
const {GetPostJob, DoPostJob} = require('../controllers/Job/PostJob');
const { GetAllPostedJob, GetSingleJob} = require('../controllers/Job/ViewJobClient');
const { UpdateJob, DeleteJob } = require('../controllers/Job/UpdateJob');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//Private  routes
//(Both client and freelancers)
//GET requests
router.get('/profile', GetProfile);
router.get('/change-password', GetChangePassword);

//POST requests
router.post('/update-profile', UpdateProfile);
router.post('/change-password', UpdatePassword);

//Client
//GET requests
router.get('/post-job', GetPostJob);
router.get('/my-jobs/:category', GetAllPostedJob);
router.get('/view-job/:id', GetSingleJob);
//
// //POST requests
router.post('/post-job', DoPostJob);
router.post('/update-job', UpdateJob);
router.post('/delete-job', DeleteJob);


module.exports = router;
