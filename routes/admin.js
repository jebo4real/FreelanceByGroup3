const express = require('express');
let router = express.Router();
const { GetJobCategories, DoAddJobCategory,
    DoUpdateJobCategory, DoDeleteJobCategory } = require('../controllers/Admin/Settings');
const { GetUsers, Accept,
    Reject, Block, UnBlock } = require('../controllers/Admin/User');
const {GetAllPostedJob} = require('../controllers/Admin/Job');
const { GetDashboardAdmin } = require('../controllers/Dashboard/DashboardAdmin');

//Private  routes
//GET requests
router.get('/', GetDashboardAdmin);
router.get('/dashboard-admin', GetDashboardAdmin);
router.get('/job-categories', GetJobCategories);
router.get('/users/:category', GetUsers);
router.get('/jobs/:category', GetAllPostedJob);
// //POST requests
router.post('/add-job-category', DoAddJobCategory);
router.post('/update-job-category', DoUpdateJobCategory);
router.post('/delete-job-category', DoDeleteJobCategory);
router.post('/accept-user', Accept);
router.post('/reject-user', Reject);
router.post('/block-user', Block);
router.post('/unblock-user', UnBlock);


module.exports = router;
