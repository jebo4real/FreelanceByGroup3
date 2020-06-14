const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;
const JobPayment = require('../../models').JobPayment;
const Chat = require('../../models').Chat;
const Contract = require('../../models').Contract;
const JobReport = require('../../models').JobReport;
const Notification = require('../../models').Notification;
const db = require("../../models");
const { QueryTypes } = require('sequelize');

module.exports.GetDashboardFreelancer = async (req, res, next) =>{
    let jobsAppCount = JobApplication.findAll({ 
        where:{FreelanceId:res.locals.user.id}
    });
    let jobsAwarded = JobApplication.findAll({
        where:{
            [Op.and]: [
                {FreelanceId:res.locals.user.id},
                {
                    [Op.or]:[
                        {status: 'awarded'},
                        {status: 'accepted'}
                    ]
                }
            ]
        }
    });
    let acc = 'accepted';
    // let jobDoneCount = await db.sequelize.query('SELECT COUNT(Jobapplications.id) AS jobF FROM Jobapplications ' +
    //     'LEFT JOIN Contracts ON Contracts.JobId = Jobapplications.JobId WHERE Contracts.status ="'+acc+'" AND Jobapplications.FreelanceId = "'+res.locals.user.id+'"', {
    //     type: QueryTypes.SELECT
    // });
    let jobApps = await JobApplication.findAll({
        where:{FreelanceId: res.locals.user.id},
        include: [
            {
                model: Job,
                as: 'Job',
            }
        ],
        order:[
            ['createdAt', 'DESC']
        ],
          limit: 4
    });

    let jobAppCount = 0;
    let jobAwarded = 0;
    jobsAppCount.map(jb=>{
        jobAppCount++;
    });
    jobsAwarded.map(jsa =>{
        jobAwarded++;
    });
    JobApplication.findAndCountAll({
        where:{
            [Op.and]:[
                {status: null},
                {FreelanceId: res.locals.user.id},
            ]
        }
    }).then(result=>{
        let jobDoneCount = result.count;
        res.render(
            'dashboard/dashboard-freelancer',
            {
                jobAppCount,
                jobAwarded,
                jobDoneCount,
                jobApps,
            }
        )
    }).catch(err=>{
        console.log(err);
    });

};