const express = require('express');
let router = express.Router();
const { GetProfile, UpdateProfile } = require('../controllers/Profile/Profile');
const { GetChangePassword, UpdatePassword } = require('../controllers/Profile/Password');
const { GetPostJob, DoPostJob } = require('../controllers/Job/PostJob');
const { GetAllPostedJob, GetSingleJob, AwardJob } = require('../controllers/Job/ViewJobClient');
const { UpdateJob, DeleteJob } = require('../controllers/Job/UpdateJob');
const { GetAppliedJobs, AcceptJob, RejectJob } = require('../controllers/Job/JobFreelancer');
const { GetDashboardSwitch } = require('../controllers/Dashboard/DashboardSwitch');
const { GetDashboardClient } = require('../controllers/Dashboard/DashBoardClient');
const { GetDashboardFreelancer } = require('../controllers/Dashboard/DashboardFreelancer');
const { GetWorkSpaceInfo, SendMessage, StartJob, WorkspaceAcceptJob,
    WorkspaceRejectJob, WorkspaceReport } = require('../controllers/Job/JobWorkSpace');

/* GET users listing. */
router.get('/', GetDashboardSwitch);

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
router.get('/dashboard-client', GetDashboardClient);
router.get('/dashboard-freelancer', GetDashboardFreelancer);
router.get('/post-job', GetPostJob);
router.get('/my-jobs/:category', GetAllPostedJob);
router.get('/freelancer-jobs/:category', GetAppliedJobs);
router.get('/view-job/:id', GetSingleJob);
router.get('/award-job/:id', AwardJob);
router.get('/accept-job/:id', AcceptJob);
router.get('/reject-job/:id', RejectJob);

//Workspace
router.get('/workspace/:id', GetWorkSpaceInfo);
router.post('/send-message', SendMessage);

// //POST requests
router.post('/post-job', DoPostJob);
router.post('/update-job', UpdateJob);
router.post('/delete-job', DeleteJob);


module.exports = router;
