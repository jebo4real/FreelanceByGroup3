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
    let jobDoneCount = await db.sequelize.query('SELECT COUNT(jobapplications.id) AS jobF FROM jobapplications ' +
        'LEFT JOIN contracts ON contracts.JobId = jobapplications.JobId WHERE contracts.status ="'+acc+'" AND jobapplications.FreelanceId = "'+res.locals.user.id+'"', {
        type: QueryTypes.SELECT
    });
    jobAppCount  = Object.keys(jobAppCount).length;
    jobAwarded  = Object.keys(jobAwarded).length;
    jobDoneCount  = Object.keys(jobDoneCount).length;
    res.render(
        'dashboard/dashboard-freelancer',
        {
            jobAppCount,
            jobAwarded,
            jobDoneCount
        }
    )
};