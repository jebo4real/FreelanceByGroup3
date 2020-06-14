const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobApplication = require('../../models').JobApplication;
const JobCategory = require('../../models').JobCategory;
const User = require('../../models').User;
const Contract = require('../../models').Contract;
const {Notify, NotifyMail} = require('../../services/Notification');

module.exports.ApplyJob = async (req, res, next) => {
    let hostname = req.headers.host;
    let appInfo = {
        JobId: req.params.id || '00',
        FreelanceId: res.locals.user.id || '00'
    };
    const job_created= await JobApplication.create(appInfo);
    let jobOwnerInfo = await Job.findOne({ where:{id: appInfo.JobId}, include: User });

    let notifyParts = {
        title: res.locals.user.firstname+" applied for a job you posted",
        message: "/user/my-jobs/all",
        ReceiverId: jobOwnerInfo.ClientId
    };
    let notifyMailParts = {
        title: res.locals.user.firstname+" applied for a job you posted",
        message: '<div style="background-color:white;color:black;">'+
                 '<p style="font-weight: bold;">Group 3 freelancer.</p>'+ 
                 '<p>Congratulations, '+req.session.user.firstname+ ' applied for a job you posted.</p>'+
                '<p><a href="http://'+hostname+'/login/'+'">Click here to login</a></p></div>',
        ReceiverEmail: jobOwnerInfo.User.email
    };
    Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);
    res.redirect('/user/job-view/'+req.params.id);
};


module.exports.ContactApplyJob = async (req, res, next) => {
    let hostname = req.headers.host;
    let appInfo = {
        JobId: req.params.id || '00',
        FreelanceId: res.locals.user.id || '00'
    };
    const job_created= await JobApplication.create(appInfo);
    let jobOwnerInfo = await Job.findOne({ where:{id: appInfo.JobId}, include: User });

    let notifyParts = {
        title: res.locals.user.firstname+" applied for a job you posted",
        message: "/user/my-jobs/all",
        ReceiverId: jobOwnerInfo.ClientId
    };
    let notifyMailParts = {
        title: res.locals.user.firstname+" applied for a job you posted",
        message: '<div style="background-color:white;color:black;">'+
                 '<p style="font-weight: bold;">Group 3 freelancer.</p>'+ 
                 '<p>Congratulations, '+req.session.user.firstname+ ' applied for a job you posted.</p>'+
                '<p><a href="http://'+hostname+'/login/'+'">Click here to login</a></p></div>',
        ReceiverEmail: jobOwnerInfo.User.email
    };
    Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);
    res.redirect('/user/message-room/'+jobOwnerInfo.User.id);
};

module.exports.GetAllJobsFreelancer = async (req, res, next) =>{
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
        order:[['createdAt', 'DESC']]
    });
    let category = await JobCategory.findAll();
    let jobCount = await Job.count();
    let searchResult = "All Jobs";
    res.render(
        'job/jobs_all',
        {
            jobs,
            jobCount,
            category,
            searchResult,
            page: 'jobs'
        }
    )
}

module.exports.GetJobsFilterFreel = async (req, res, next)=>{
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
        });
        searchResult = "";
    }

    let category = await JobCategory.findAll();
    let jobCount = await Job.count();
    res.render(
        'job/jobs_all',
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

module.exports.SingleJobDetail = async (req, res, next) => {
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
        'job/job-view',
        {
            job,
            related_jobs,
            user_application,
            user_applied,
            page:'jobs'
        }
    )
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
                    {
                        [Op.or]:[
                            {status: 'awarded'},
                            {status: 'accepted'}
                        ]
                    }
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
    let hostname = req.headers.host;
    let job_awarded = await JobApplication.update(jobAppStatus,{where:{id:appId} });
    let job_just_awarded = await JobApplication.findOne({ where:{id:appId} });
    let job = await Job.findOne({where:{id:job_just_awarded.JobId}, include:User });
    let jobContract = {
        JobId: job.id,
        status: 'start'
    };
    let job_contract = await Contract.create(jobContract);

    let notifyParts = {
        title: res.locals.user.firstname+" accepted the job",
        message: "/user/my-jobs/awarded",
        ReceiverId: job.ClientId
    };
    let notifyMailParts = {
        title: res.locals.user.firstname+" accepted the job",
        message: '<div style="background-color:white;color:black;">'+
                 '<p style="font-weight: bold;">Group 3 freelancer.</p>'+ 
                 '<p>Congratulations'+res.locals.user.firstname+ 'accepted the awarded job.</p>'+
                '<p><a href="http://'+hostname+'/login/'+'">Click here to login</a></p></div>',
        ReceiverEmail: job.User.email
    };
    Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);

    res.redirect('/user/workspace/'+job_just_awarded.id);
};

module.exports.RejectJob = async (req, res, next) => {
    let hostname = req.headers.host;
    let appId = req.params.id;
    let jobAppStatus = {
        status:''
    };
   
    let job = await JobApplication.findOne({where:{id:appId},include:User });
    let job_updated = await Job.update(jobAppStatus, {where: {id:job.JobId} });
    let jobApp_rejected = await JobApplication.destroy({where:{id:appId} });

    let notifyParts = {
        title: res.locals.user.firstname+" rejected the job",
        message: "/user/my-jobs/all",
        ReceiverId: job.ClientId
    };
    let notifyMailParts = {
        title: res.locals.user.firstname+" rejected the job",
        message: '<div style="background-color:white;color:black;">'+
                 '<p style="font-weight: bold;">Group 3 freelancer.</p>'+ 
                 '<p>Sorry '+res.locals.user.firstname+ ' rejected the awarded job.</p>'+
                '<p><a href="http://'+hostname+'/login/'+'">Click here to see other applicants</a></p></div>',
        ReceiverEmail: job.User.email
    };
    Notify(notifyParts.title, notifyParts.message, notifyParts.ReceiverId);
    NotifyMail(notifyMailParts.title, notifyMailParts.message, notifyMailParts.ReceiverEmail);

    res.redirect('/job/'+job.JobId);
};
