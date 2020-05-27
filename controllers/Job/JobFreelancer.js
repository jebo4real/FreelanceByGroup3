const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobApplication = require('../../models').JobApplication;
const JobCategory = require('../../models').JobCategory;
const User = require('../../models').User;
const Contract = require('../../models').Contract;
const {Notify, NotifyMail} = require('../../services/Notification');

module.exports.ApplyJob = async (req, res, next) => {
    let appInfo = {
        JobId: req.params.id || '00',
        FreelanceId: res.locals.user.id || '00'
    };
    const job_created= await JobApplication.create(appInfo);
    let jobOwnerInfo = await Job.findOne({ where:{id: appInfo.JobId}, include: User });

    let notifyParts = {
        title: res.locals.user.firstname+" applied for a job you posted",
        message: "/user/jobs",
        ReceiverId: jobOwnerInfo.ClientId
    };
    let notifyMailParts = {
        title: res.locals.user.firstname+" applied for a job you posted",
        message: res.locals.user.firstname+" applied for a job you posted",
        ReceiverEmail: jobOwnerInfo.User.email
    };
    Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);
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
    let job = JobApplication.findOne({where:{id:appId}, include:User });
    let jobContract = {
        JobId: job.JobId
    };
    let job_contract = Contract.create(jobContract);

    let notifyParts = {
        title: res.locals.user.firstname+" accepted the job",
        message: "/user/jobs",
        ReceiverId: job.ClientId
    };
    let notifyMailParts = {
        title: res.locals.user.firstname+" accepted the job",
        message: res.locals.user.firstname+" accepted the awarded job",
        ReceiverEmail: job.User.email
    };
    Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);

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

    let notifyParts = {
        title: res.locals.user.firstname+" rejected the job",
        message: "/user/jobs",
        ReceiverId: job.ClientId
    };
    let notifyMailParts = {
        title: res.locals.user.firstname+" rejected the job",
        message: res.locals.user.firstname+" rejected the awarded job",
        ReceiverEmail: job.User.email
    };
    Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);

    res.redirect('/user/freelancer-jobs/all');
};
