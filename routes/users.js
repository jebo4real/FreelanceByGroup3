const express = require('express');
let router = express.Router();
const { GetProfile, UpdateProfile, GetProfileSuccess } = require('../controllers/Profile/Profile');
const  {GetPortfolio, UpdatePortfolio, GetPortfolioSuccess} = require('../controllers/Profile/Portfolio');
const  {GetSelectMessageUsers, GetMessageRoom, SendMessageUser} = require('../controllers/Messaging/Message');
const  {GetInboxOutbox, SendMessageFromBox} = require('../controllers/Messaging/MessageBox');
const { GetChangePassword, UpdatePassword } = require('../controllers/Profile/Password');
const { GetPostJob, DoPostJob } = require('../controllers/Job/PostJob');
const { GetAllPostedJob, GetSingleJob, AwardJob } = require('../controllers/Job/ViewJobClient');
const { UpdateJob, DeleteJob } = require('../controllers/Job/UpdateJob');
const { GetAppliedJobs, AcceptJob, RejectJob } = require('../controllers/Job/JobFreelancer');
const { GetDashboardSwitch } = require('../controllers/Dashboard/DashboardSwitch');
const { GetDashboardClient } = require('../controllers/Dashboard/DashBoardClient');
const { GetDashboardFreelancer } = require('../controllers/Dashboard/DashboardFreelancer');
const { GetWorkSpaceInfo, SendMessage, StartJob, WorkspaceAcceptJob,
    WorkspaceRejectJob, WorkspaceReport, UploadFile, ViewFile } = require('../controllers/Job/JobWorkSpace');
const {Pay} = require('../controllers/Job/StripePayment');
const {NotVerified} = require('../controllers/Auth/Verify');


/* GET users listing. */
router.get('/', GetDashboardSwitch);
router.get('/notverified', NotVerified);


//Private  routes
//(Both client and freelancers)
//GET requests
router.get('/profile', GetProfile);
router.get('/profile/:success', GetProfileSuccess);
router.get('/portfolio', GetPortfolio);
router.get('/portfolio/:success', GetPortfolioSuccess);
router.get('/change-password', GetChangePassword);
router.get('/message-box', GetInboxOutbox);
// router.get('/message-users', GetSelectMessageUsers);
router.get('/message-room/:user', GetMessageRoom);

//POST requests
router.post('/update-profile', UpdateProfile);
router.post('/update-portfolio', UpdatePortfolio);
router.post('/change-password', UpdatePassword);
router.post('/send-message-user-from-box', SendMessageFromBox);
router.post('/send-message-user', SendMessageUser);

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
router.get('/view-file/:filename', ViewFile);

//Workspace
router.get('/workspace/:id', GetWorkSpaceInfo);
router.post('/send-message', SendMessage);
router.post('/upload-file', UploadFile);
router.post('/pay', Pay);


// //POST requests
router.post('/post-job', DoPostJob);
router.post('/update-job', UpdateJob);
router.post('/delete-job', DeleteJob);


module.exports = router;
