const express = require('express');
let router = express.Router();
const { GetJobCategories, DoAddJobCategory,
    DoUpdateJobCategory, DoDeleteJobCategory } = require('../controllers/Admin/Settings');

//Private  routes
//GET requests
router.get('/', GetJobCategories);
router.get('/job-categories', GetJobCategories);
// //POST requests
router.post('/add-job-category', DoAddJobCategory);
router.post('/update-job-category', DoUpdateJobCategory);
router.post('/delete-job-category', DoDeleteJobCategory);


module.exports = router;
