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
    let jobCount = Job.findAll({ where:{ClientId:res.locals.user.id} });
    let jobAwarded = Job.findAll({
        where:{
            [Op.and]: [
                {ClientId:res.locals.user.id},
                {status:'awarded'}
            ]
        }
    });
    let acc = 'accepted';
    let jobDoneCount = await db.sequelize.query('SELECT COUNT(jobs.id) AS jobC FROM jobs ' +
        'LEFT JOIN contracts ON contracts.JobId = jobs.id WHERE contracts.status ="'+acc+'" AND jobs.ClientId = "'+res.locals.user.id+'"', {
        type: QueryTypes.SELECT
    });
    jobCount  = Object.keys(jobCount).length;
    jobAwarded  = Object.keys(jobAwarded).length;
    jobDoneCount  = Object.keys(jobDoneCount).length;
    res.render(
        'dashboard/dashboard-client',
        {
            jobCount,
            jobAwarded,
            jobDoneCount
        }
    )
};