const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;
const {Notify, NotifyMail} = require('../../services/Notification');

module.exports.GetAllPostedJob = async (req, res, next) => {
    let jobCat = req.params.category;
    let title = "All Jobs Posted";
    let jobs = await Job.findAll({where: {ClientId: res.locals.user.id}, include:JobCategory });
    if (jobCat === "all") {
        jobs = await Job.findAll({where: {ClientId: res.locals.user.id}, include:JobCategory});
    } else if (jobCat === "awarded") {
        jobs = await Job.findAll({
            where: {
                [Op.and]: [
                    {ClientId: res.locals.user.id},
                    {status: 'awarded'}
                ]
            },
            include:JobCategory
        });
        title = "Awarded Jobs";
    }
    console.log(jobs);
    res.render(
        'job/my-jobs',
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
        'job/view-single-job',
        {
            job,
            category,
            jobDetail,
            jobAppAwardId
        }
    )
};

module.exports.AwardJob = async (req, res, next) => {
    let appId = req.params.id;
    let status = {
        status:'awarded'
    };
    let job_awarded = JobApplication.update(status,{where:{id:appId} });
    let JobApp = await JobApplication.findOne({where:{id:appId}, include:User });
    let job_updated = Job.update(status, {where: {id:JobApp.JobId} });
    let jobOwnerInfo = await Job.findOne({ where:{id:JobApp.JobId}, include: User });

    let notifyParts = {
        title: jobOwnerInfo.title+" has been awarded to you",
        message: "/user/jobs/awarded",
        ReceiverId: JobApp.FreelanceId
    };
    let notifyMailParts = {
        title: jobOwnerInfo.title+" has been awarded to you",
        message: jobOwnerInfo.title+" has been awarded to you",
        ReceiverEmail: JobApp.User.email
    };
    Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);

    res.redirect('/user/my-jobs/awarded');
};
