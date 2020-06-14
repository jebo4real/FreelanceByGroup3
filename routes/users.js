const express = require('express');
let router = express.Router();
const { GetProfile, UpdateProfile, GetProfileSuccess } = require('../controllers/Profile/Profile');
const  {GetPortfolio, UpdatePortfolio, GetPortfolioSuccess, GetAllPortfolios,GetAddPortfolio,AddPortfolio} = require('../controllers/Profile/Portfolio');
const  {GetEducation, UpdateEducation, GetAllEducations, AddEducation,GetAddEducation} = require('../controllers/Profile/Education');
const  {GetQualification, UpdateQualification, GetQualificationSuccess} = require('../controllers/Profile/Qualification');
const  {GetSelectMessageUsers, GetMessageRoom, GetRandomMessageRoom, SendMessageUser} = require('../controllers/Messaging/Message');
const  {GetInboxOutbox, SendMessageFromBox} = require('../controllers/Messaging/MessageBox');
const { GetChangePassword, UpdatePassword } = require('../controllers/Profile/Password');
const { GetPostJob, DoPostJob } = require('../controllers/Job/PostJob');
const { GetAllPostedJob, GetSingleJob, GetFreelancerProfile, AwardJob } = require('../controllers/Job/ViewJobClient');
const { UpdateJob, DeleteJob } = require('../controllers/Job/UpdateJob');
const { GetAppliedJobs, AcceptJob, RejectJob, GetAllJobsFreelancer, GetJobsFilterFreel, SingleJobDetail, ContactApplyJob } = require('../controllers/Job/JobFreelancer');
const { GetDashboardSwitch } = require('../controllers/Dashboard/DashboardSwitch');
const { GetDashboardClient } = require('../controllers/Dashboard/DashBoardClient');
const { GetDashboardFreelancer } = require('../controllers/Dashboard/DashboardFreelancer');
const { GetWorkSpaceInfo, SendMessage, WorkspaceAcceptJob, WorkspaceRejectJob, WorkspaceSupport, 
    UploadFile, ViewFile, ReviewAndRateClient, ReviewAndRateFreelancer, Invoice, CompleteJob } = require('../controllers/Job/JobWorkSpace');
const {Pay, GetPaid} = require('../controllers/Job/StripePayment');
const {NotVerified} = require('../controllers/Auth/Verify');
const {GetPaymentDetails, AddPaymentDetails, CreateStripeAccount} = require('../controllers/Profile/PaymentDetails');


/* GET users listing. */
router.get('/', GetDashboardSwitch);
router.get('/notverified', NotVerified);



//Private  routes
//(Both client and freelancers)
//GET requests
router.get('/profile', GetProfile);
router.get('/profile/:success', GetProfileSuccess);
router.get('/add-portfolio', GetAddPortfolio);
router.get('/portfolios', GetAllPortfolios);
router.get('/portfolio/:id', GetPortfolio);
router.get('/portfolio/:id/:success', GetPortfolioSuccess);
router.get('/add-education', GetAddEducation)
router.get('/education/:id', GetEducation);
router.get('/educations', GetAllEducations);
router.get('/qualification', GetQualification);
router.get('/qualification/:success', GetQualificationSuccess);
router.get('/payment', GetPaymentDetails);
router.get('/create-stripe-account', CreateStripeAccount);
router.get('/change-password', GetChangePassword);
router.get('/message-box', GetInboxOutbox);
// router.get('/message-users', GetSelectMessageUsers);
router.get('/message-room/:user', GetMessageRoom);
router.get('/message-room/', GetRandomMessageRoom);

//POST requests
router.post('/update-profile', UpdateProfile);
router.post('/update-portfolio', UpdatePortfolio);
router.post('/add-portfolio', AddPortfolio);
router.post('/update-education', UpdateEducation);
router.post('/add-education', AddEducation);
router.post('/update-qualification', UpdateQualification);
router.post('/change-password', UpdatePassword);
router.post('/send-message-user-from-box', SendMessageFromBox);
router.post('/send-message-user', SendMessageUser);
router.post('/add-payment-account', AddPaymentDetails);

//Client
//GET requests
router.get('/dashboard-client', GetDashboardClient);
router.get('/dashboard-freelancer', GetDashboardFreelancer);
router.get('/post-job', GetPostJob);
router.get('/my-jobs/:category', GetAllPostedJob);
router.get('/freelancer-jobs/:category', GetAppliedJobs);
router.get('/all-jobs', GetAllJobsFreelancer);
router.get('/view-job/:id', GetSingleJob);
router.get('/view-freel/:id', GetFreelancerProfile);
router.get('/award-job/:id', AwardJob);
router.get('/accept-job/:id', AcceptJob);
router.get('/reject-job/:id', RejectJob);
router.get('/view-file/:filename', ViewFile);

//user job view 
router.post('/filter-jobs-freel', GetJobsFilterFreel);
router.get('/job-view/:id', SingleJobDetail);
router.get('/contact-about-job/:id', ContactApplyJob);

//Workspace
router.get('/workspace/:id', GetWorkSpaceInfo);
router.post('/send-message', SendMessage);
router.post('/upload-file', UploadFile);
router.post('/review-client', ReviewAndRateClient);
router.post('/review-freelancer', ReviewAndRateFreelancer);
router.get('/complete-job/:id', CompleteJob);
router.get('/client-accept-job/:id', WorkspaceAcceptJob);
router.get('/client-reject-job/:id', WorkspaceRejectJob);
router.post('/support-job', WorkspaceSupport);

router.get('/invoice/:id', Invoice);
router.post('/pay/', Pay);
router.post('/get-paid/', GetPaid);

// //POST requests
router.post('/post-job', DoPostJob);
router.post('/update-job', UpdateJob);
router.post('/delete-job', DeleteJob);


module.exports = router;
