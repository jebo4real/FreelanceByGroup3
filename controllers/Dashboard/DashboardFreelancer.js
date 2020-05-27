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
    let jobAppCount = JobApplication.findAll({ where:{FreelanceId:res.locals.user.id} });
    let jobAwarded = JobApplication.findAll({
        where:{
            [Op.and]: [
                {FreelanceId:res.locals.user.id},
                {status:'accepted'}
            ]
        }
    });
    let acc = 'accepted';
    // let jobDoneCount = await db.sequelize.query('SELECT COUNT(Jobapplications.id) AS jobF FROM Jobapplications ' +
    //     'LEFT JOIN Contracts ON Contracts.JobId = Jobapplications.JobId WHERE Contracts.status ="'+acc+'" AND Jobapplications.FreelanceId = "'+res.locals.user.id+'"', {
    //     type: QueryTypes.SELECT
    // });
    jobAppCount  = Object.keys(jobAppCount).length;
    jobAwarded  = Object.keys(jobAwarded).length;
    //jobDoneCount  = Object.keys(jobDoneCount).length;
    res.render(
        'dashboard/dashboard-freelancer',
        {
            jobAppCount,
            jobAwarded
        }
    )
};