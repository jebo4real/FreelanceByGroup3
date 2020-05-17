const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;

module.exports.GetAllPostedJob = async (req, res, next) => {
    let jobCat = req.params.category;
    let jobs = await Job.findAll({where: {ClientId: res.locals.user.id}});
    if (jobCat === "all") {
        jobs = await Job.findAll({where: {ClientId: res.locals.user.id}});
    } else if (jobCat === "awarded") {
        jobs = await Job.findAll({
            where: {
                [Op.and]: [
                    {ClientId: res.locals.user.id},
                    {status: 'awarded'}
                ]
            }
        });
    }
    console.log(jobs);
    res.render(
        'job/my-jobs',
        {
            jobs
        }
    )
};

module.exports.GetSingleJob = async (req, res, next) => {
    let jobId = req.params.id;
    let job = await Job.findOne( {where: {id:jobId} });
    let jobDetail = await JobApplication.findAll({where: {JobId: jobId}, include: User});
    console.log(job);
    res.render(
        'job/view-single-job',
        {
            job,
            jobDetail
        }
    )
};
