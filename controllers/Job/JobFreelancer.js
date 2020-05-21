const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobApplication = require('../../models').JobApplication;
const JobCategory = require('../../models').JobCategory;
const User = require('../../models').User;
const Contract = require('../../models').Contract;

module.exports.ApplyJob = async (req, res, next) => {
    let appInfo = {
        JobId: req.params.id || '00',
        FreelanceId: res.locals.user.id || '00'
    };

    const job_created= await JobApplication.create(appInfo);

    res.redirect('/jobs');
};

module.exports.GetAppliedJobs = async (req, res, next) => {
    let jobCat = req.params.category;
    let title = "Applied Jobs";
    let jobApps = await JobApplication.findAll({where: {FreelanceId: res.locals.user.id}, include:Job });
    if (jobCat === "all") {
        jobApps = await JobApplication.findAll({where: {FreelanceId: res.locals.user.id}, include:Job });
    } else if (jobCat === "awarded") {
        jobApps = await JobApplication.findAll({
            where: {
                [Op.and]: [
                    {FreelanceId: res.locals.user.id},
                    {status: 'awarded'}
                ]
            },
            include:Job
        });
        title = "Awarded Jobs";
    } else if (jobCat === "accepted") {
        jobApps = await JobApplication.findAll({
            where: {
                [Op.and]: [
                    {FreelanceId: res.locals.user.id},
                    {status: 'accepted'}
                ]
            },
            include:Job
        });
        title = "Accepted Jobs";
    }
    console.log(jobApps);
    res.render(
        'job/freelancer-jobs',
        {
            jobApps,
            title
        }
    )
};

module.exports.AcceptJob = async (req, res, next) => {
    let appId = req.params.id;
    let jobAppStatus = {
        status:'accepted'
    };
    let job_awarded = JobApplication.update(jobAppStatus,{where:{id:appId} });
    let job = JobApplication.findOne({where:{id:appId} });
    let jobContract = {
        JobId: job.JobId
    };
    let job_contract = Contract.create(jobContract);
    res.redirect('/user/freelancer-jobs/accepted');
};

module.exports.RejectJob = async (req, res, next) => {
    let appId = req.params.id;
    let jobAppStatus = {
        status:''
    };
    let jobApp_rejected = JobApplication.update(jobAppStatus,{where:{id:appId} });
    let job = await JobApplication.findOne({where:{id:appId} });
    let job_updated = Job.update(jobAppStatus, {where: {id:job.JobId} });

    res.redirect('/user/freelancer-jobs/all');
};
