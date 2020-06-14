const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;
const JobPayment = require('../../models').JobPayment;
const Chat = require('../../models').Chat;
const Contract = require('../../models').Contract;
const JobReport = require('../../models').JobReport;
const db = require("../../models");
const { QueryTypes } = require('sequelize');

module.exports.GetDashboardClient = async (req, res, next) =>{
    let jobs = Job.findAll({ where:{ClientId:res.locals.user.id} });
    let jobsAwarded = Job.findAll({
        where:{
            [Op.and]: [
                {ClientId:res.locals.user.id},
                {status:'awarded'}
            ]
        }
    });
    let jobApps = await JobApplication.findAll({
        include: [
            {
                model: Job,
                as: 'Job',
                where: {ClientId: res.locals.user.id},
            },
            {
                model: User,
                as: 'User',
            }
        ],
        order:[
          ['createdAt', 'DESC']
        ],
        limit: 4
    });

    let jobCount = 0;
    let jobAwarded = 0;
    jobs.map(jb=>{
       jobCount++;
    });
    jobsAwarded.map(jsa =>{
        jobAwarded++;
    });
    Contract.findAndCountAll({
        where:{status: 'accept'},
        include: [
            {
                model: Job,
                as: 'Job',
                where: {ClientId: res.locals.user.id},
            },
        ]
    }).then(result=>{
        let jobDoneCount = result.count;
        res.render(
            'dashboard/dashboard-client',
            {
                jobCount,
                jobAwarded,
                jobDoneCount,
                jobApps
            }
        )
    }).catch(err=>{
       console.log(err);
    });

};