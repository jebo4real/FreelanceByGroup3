const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const JobPayment = require('../../models').JobPayment;
const Chat = require('../../models').Chat;
const Contract = require('../../models').Contract;
const JobReport = require('../../models').JobReport;
const db = require("../../models");
const { QueryTypes } = require('sequelize');

module.exports.GetDashboardAdmin = async (req, res, next) =>{
    let jobs = Job.findAll();
    let jobsAwarded = Job.findAll({
        where: {status:'awarded'}
    });
    let clients = await Job.findAll({
        attributes: {
            include: [[db.Sequelize.fn("COUNT", db.Sequelize.col("job.id")), "NoJob"]]
        },
        include: [
            {
                model:User,
                as: 'User',
            }
        ],
        limit: 5,
        group: ['User.id']
    });
    console.log(clients);
    let latestJobAwarded = await JobApplication.findAll({
        where:{status:'awarded'},
        include: [
            {
              model:Job,
              as: 'Job'
            },
            {
                model:User,
                as: 'User',
            }
        ],
        limit: 5
    });
    console.log(latestJobAwarded);
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
            },
        ]
    }).then(result=>{
        let jobDoneCount = result.count;
        res.render(
            'dashboard/dashboard-admin',
            {
                jobCount,
                jobAwarded,
                jobDoneCount,
                clients,
                latestJobAwarded
            }
        )
    }).catch(err=>{
        console.log(err);
    });

};