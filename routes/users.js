const express = require('express');
let router = express.Router();
const { GetProfile, UpdateProfile, GetProfileSuccess } = require('../controllers/Profile/Profile');
const  {GetPortfolio, UpdatePortfolio, GetPortfolioSuccess} = require('../controllers/Profile/Portfolio');
const  {GetEducation, UpdateEducation, GetEducationSuccess} = require('../controllers/Profile/Education');
const  {GetQualification, UpdateQualification, GetQualificationSuccess} = require('../controllers/Profile/Qualification');
const  {GetSelectMessageUsers, GetMessageRoom, SendMessageUser} = require('../controllers/Messaging/Message');
const  {GetInboxOutbox, SendMessageFromBox} = require('../controllers/Messaging/MessageBox');
const { GetChangePassword, UpdatePassword } = require('../controllers/Profile/Password');
const { GetPostJob, DoPostJob } = require('../controllers/Job/PostJob');
const { GetAllPostedJob, GetSingleJob, GetFreelancerProfile, AwardJob } = require('../controllers/Job/ViewJobClient');
const { UpdateJob, DeleteJob } = require('../controllers/Job/UpdateJob');
const { GetAppliedJobs, AcceptJob, RejectJob } = require('../controllers/Job/JobFreelancer');
const { GetDashboardSwitch } = require('../controllers/Dashboard/DashboardSwitch');
const { GetDashboardClient } = require('../controllers/Dashboard/DashBoardClient');
const { GetDashboardFreelancer } = require('../controllers/Dashboard/DashboardFreelancer');
const { GetWorkSpaceInfo, SendMessage, WorkspaceAcceptJob, WorkspaceRejectJob, WorkspaceReport, 
    UploadFile, ViewFile, ReviewAndRateClient, ReviewAndRateFreelancer, Invoice, CompleteJob } = require('../controllers/Job/JobWorkSpace');
const {Pay, GetPaid} = require('../controllers/Job/StripePayment');
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
router.get('/education', GetEducation);
router.get('/education/:success', GetEducationSuccess);
router.get('/qualification', GetQualification);
router.get('/qualification/:success', GetQualificationSuccess);
router.get('/change-password', GetChangePassword);
router.get('/message-box', GetInboxOutbox);
// router.get('/message-users', GetSelectMessageUsers);
router.get('/message-room/:user', GetMessageRoom);

//POST requests
router.post('/update-profile', UpdateProfile);
router.post('/update-portfolio', UpdatePortfolio);
router.post('/update-education', UpdateEducation);
router.post('/update-qualification', UpdateQualification);
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
router.get('/view-freel/:id', GetFreelancerProfile);
router.get('/award-job/:id', AwardJob);
router.get('/accept-job/:id', AcceptJob);
router.get('/reject-job/:id', RejectJob);
router.get('/view-file/:filename', ViewFile);

//Workspace
router.get('/workspace/:id', GetWorkSpaceInfo);
router.post('/send-message', SendMessage);
router.post('/upload-file', UploadFile);
router.post('/review-client', ReviewAndRateClient);
router.post('/review-freelancer', ReviewAndRateFreelancer);
router.get('/complete-job/:id', CompleteJob);
router.get('/client-accept-job/:id', WorkspaceAcceptJob);
router.get('/client-reject-job/:id', WorkspaceRejectJob);
router.post('/report-job/:id', WorkspaceReport);

router.get('/invoice/:id', Invoice);
router.post('/pay/', Pay);
router.get('/get-paid/', GetPaid);

// //POST requests
router.post('/post-job', DoPostJob);
router.post('/update-job', UpdateJob);
router.post('/delete-job', DeleteJob);


module.exports = router;
