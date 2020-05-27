const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobApplication = require('../../models').JobApplication;
const JobCategory = require('../../models').JobCategory;
const User = require('../../models').User;

module.exports.GetIndex = async (req, res, next) => {
    let jobs = await Job.findAll( {include: JobCategory});
    let category = await JobCategory.findAll();
    let searchResult = "All Jobs";
    res.render(
        'index',
        {
            category,
            searchResult
        }
    )
};

module.exports.GetAllJobs = async (req, res, next) => {
    let jobs = await Job.findAll( {include: JobCategory});
    let category = await JobCategory.findAll();
    let jobCount = Object.keys(jobs).length;
    let searchResult = "All Jobs...";
    res.render(
        'jobs',
        {
            jobs,
            category,
            searchResult
        }
    )
};

module.exports.GetJobsCategoryAndSearch = async (req, res, next) => {
    let searchParams = {};
    let jobs= {};
    let category = await JobCategory.findAll();
    let searchResult = "All Jobs";
    if(req.body.category!=="" && req.body.keyword!=="") {
        searchParams = {
            CatId: req.body.category || '',
            title: '%'+req.body.keyword+'%' || '',
        };
        if(req.body.category==="all"){
            jobs = await Job.findAll({
                where: {
                    title: {
                        [Op.like]: searchParams.title
                    }
                },
                include: JobCategory
            });
            searchResult = "'"+req.body.keyword + "' search results";
        }else {
            jobs = await Job.findAll({
                where: {
                    [Op.and]: [
                        {
                            title: {
                                [Op.like]: searchParams.title
                            }
                        },
                        {CatId: searchParams.CatId}
                    ]
                },
                include: JobCategory
            });
            searchResult = "'"+req.body.keyword + "' search results";
        }
    }else if(req.body.category!==""){
        searchParams = {
            CatId: req.body.category || ''
        };
        if(req.body.category==="all"){
            jobs = await Job.findAll( {include: JobCategory});
        }else {
            jobs = await Job.findAll({where: searchParams, include: JobCategory});
            console.log(jobs);
            searchResult =  "Search results";
        }

    }else if(req.body.keyword!==""){
        let title = '%'+req.body.keyword+'%' || '';
        jobs = await Job.findAll({
            where: {
                title: {
                    [Op.like]: title
                }
            },
            include: JobCategory
        });
        searchResult = "'"+req.body.keyword + " search results";
    }else{
        jobs = await Job.findAll({include: JobCategory});
    }
    let jobCount = Object.keys(jobs).length;
    searchResult+="..."+jobCount+" jobs";
    console.log(jobs);
    res.render(
        'jobs',
        {
            jobs,
            category,
            searchResult
        }
    )
};

module.exports.JobDetail = async (req, res, next) => {
    let jobId = req.params.id;
    let job = await Job.findOne( { where:{id:jobId}, include: JobCategory});
    let related_jobs = await Job.findAll( {where:{CatId:job.CatId}, include: JobCategory});
    let user_applied = false;
    if(!req.session.loggedIn){

    }else {
        let user_application = await JobApplication.findAll({
            where: {
                [Op.and]: [
                    {JobId: jobId},
                    {FreelanceId: res.locals.user.id}
                ]
            }
        });
        if (Object.keys(user_application).length > 0) {
            user_applied = true;
        }
    }
    res.render(
        'single-job-info',
        {
            job,
            related_jobs,
            user_applied
        }
    )
};