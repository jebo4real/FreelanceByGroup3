/*Phase 2*/
const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;

module.exports.GetAllPostedJob = async (req, res, next) => {
    let jobCat = req.params.category;
    let title = "All Jobs Posted";
    let jobs = await Job.findAll({include:JobCategory });
    if (jobCat === "all") {
        jobs = await Job.findAll({include:JobCategory});
    } else if (jobCat === "awarded") {
        jobs = await Job.findAll({where:{status: 'awarded'}, include:JobCategory });
        title = "Awarded Jobs";
    }
    console.log(jobs);
    res.render(
        'admin/jobs',
        {
            jobs,
            title
        }
    )
};

module.exports.GetSingleJob = async (req, res, next) => {
    let jobId = req.params.id;
    let category = await JobCategory.findAll();
    let job = await Job.findOne( {where: {id:jobId}, include:JobCategory });
    let jobDetail = await JobApplication.findAll({
        where: {JobId: jobId},
        include: User
    });
    let jobAppAwardId = 0;
    jobDetail.map(app=>{
        if(app.status==='awarded' || app.status==='accepted'){
            jobAppAwardId = app.id;
        }
    });
    console.log("Job app id: "+jobAppAwardId);
    res.render(
        'admin/view-single-job',
        {
            job,
            category,
            jobDetail,
            jobAppAwardId
        }
    )
};

