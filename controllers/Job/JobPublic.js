const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobApplication = require('../../models').JobApplication;
const JobCategory = require('../../models').JobCategory;
const User = require('../../models').User;

module.exports.GetIndex = async (req, res, next) => {
    let jobs = await Job.findAll( {
        include: [
            {
                model: JobCategory,
                as: 'JobCategory'
            },
            {
                model: User,
                as: 'User'
            }
        ],
        order:[['createdAt', 'DESC']],
        limit:5,
        offset:0
    });
    let category = await JobCategory.findAll();
    let searchResult = "All Jobs";
    res.render(
        'index',
        {
            jobs,
            category,
            searchResult,
            page: 'index'
        }
    )
};

module.exports.GetAllJobs = async (req, res, next) => {
    let jobs = await Job.findAll( {
        include: [
            {
                model: JobCategory,
                as: 'JobCategory'
            },
            {
                model: User,
                as: 'User'
            }
        ],
        order:[['createdAt', 'DESC']],
        limit:10,
        offset:0
    });
    let category = await JobCategory.findAll();
    let jobCount = await Job.count();
    let searchResult = "All Jobs";
    res.render(
        'jobs',
        {
            jobs,
            jobCount,
            category,
            searchResult,
            page: 'jobs',
            page_no: 1
        }
    )
};

module.exports.GetPageAllJobs = async (req, res, next)=>{
    let page = req.params.page;
    page = parseInt(page);
    let offset = (page - 1) * 10;
    console.log(page);
    let jobs = await Job.findAll( {
        include: [
            {
                model: JobCategory,
                as: 'JobCategory'
            },
            {
                model: User,
                as: 'User'
            }
        ],
        limit:10,
        offset:offset
    });
    let category = await JobCategory.findAll();
    let jobCount = await Job.count();
    let searchResult = "All Jobs";
    res.render(
        'jobs',
        {
            jobs,
            jobCount,
            category,
            searchResult,
            page: 'jobs',
            page_no: page
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
            jobCount,
            category,
            page: 'jobs',
            page_no: 1,
            searchResult
        }
    )
};

module.exports.JobDetail = async (req, res, next) => {
    let jobId = req.params.id;
    let job = await Job.findOne({
        where:{id:jobId},
        include: [
            {
                model: JobCategory,
                as: 'JobCategory'
            },
            {
                model: User,
                as: 'User'
            }
        ]
    });
    // let job_offerred = JobApplication.findOne({
    //     where: {
    //         [Op.and]:[
    //             {JobId:jobId},
    //             {status:'awarded'}
    //         ]
    //     }
    // });
    let related_jobs = await Job.findAll( {
        where:{CatId:job.CatId},
        include: [
            {
                model: JobCategory,
                as: 'JobCategory'
            },
            {
                model: User,
                as: 'User'
            }
        ],
        limit: 2
    });
    let user_applied = false;
    let user_application = {};
    if(!req.session.loggedIn){

    }else {
        user_application = await JobApplication.findOne({
            where: {
                [Op.and]: [
                    {JobId: jobId},
                    {FreelanceId: res.locals.user.id}
                ]
            }
        });
        if (user_application) {
            user_applied = true;
        }
    }
    res.render(
        'single-job-info',
        {
            job,
            related_jobs,
            user_application,
            user_applied,
            page:'jobs'
        }
    )
};


module.exports.GetJobsFilter = async (req, res, next) => {
    let jobs = {};
    let searchResult = "";
    if(req.body.filter_date!==null && req.body.filter_price_min && req.body.filter_price_max){
        jobs = await Job.findAll({
            where: {
                [Op.and]: [
                    {
                        price:{
                            [Op.between]:
                                [parseFloat(req.body.filter_price_min), parseFloat(req.body.filter_price_max)]                       
                        }
                },
                    {createdAt: req.body.filter_date}
                ]
            },
            include: JobCategory
        });
        searchResult = "";
    }else{
        jobs = await Job.findAll({
            where: {
                price:{
                    [Op.between]:
                        [parseFloat(req.body.filter_price_min), parseFloat(req.body.filter_price_max)]                        
                }              
            },
            include: JobCategory
        });
        searchResult = "";
    }

    let category = await JobCategory.findAll();
    let jobCount = await Job.count();
    res.render(
        'jobs',
        {
            jobs,
            jobCount,
            category,
            searchResult,
            page: 'jobs',
            page_no: 1
        }
    )
};