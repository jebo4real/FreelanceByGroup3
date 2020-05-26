const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;
const JobPayment = require('../../models').JobPayment;
const Chat = require('../../models').Chat;
const Contract = require('../../models').Contract;
const JobReport = require('../../models').JobReport;


module.exports.GetWorkSpaceInfo = async (req, res, next) =>{
    let jobAppId = req.params.id;
    let jobAppDetail = await JobApplication.findOne({ where:{id:jobAppId}, include:User });
    let job = await Job.findOne({ where:{id:jobAppDetail.JobId}, include:[JobCategory, User] });
    let jobPayment = await JobPayment.findOne({ where:{JobId: jobAppDetail.JobId} });
    let chat = await Chat.findAll({ where:{JobId:job.id} });

    res.render(
        'job/workspace',
        {
            jobAppDetail,
            job,
            jobPayment,
            chat
        }
    )
};

module.exports.SendMessage = async (req, res, next) =>{
  let chat = {
      JobId: req.body.JobId,
      SenderId: req.body.SenderId,
      message: req.body.message
  };
  Chat.create(chat);
  res.send("success");
};

module.exports.StartJob = async (req,res, next) =>{
    let jobId = req.body.JobId;
    let startJobStatus = {
        status: 'start'
    };
    let job_started = Contract.update({startJobStatus},{ where:{JobId:jobId} });
    (job_started!==null) ? res.send("success"):res.send("error");
};

module.exports.WorkspaceAcceptJob = async (req,res, next) =>{
    let jobId = req.body.JobId;
    let acceptJobStatus = {
        status: 'end',
        acceptance: 'accept'
    };
    let job_accepted = Contract.update({acceptJobStatus},{ where:{JobId:jobId} });
    (job_accepted!==null) ? res.send("success"):res.send("error");
};

module.exports.WorkspaceRejectJob = async (req,res, next) =>{
    let jobId = req.body.JobId;
    let acceptJobStatus = {
        acceptance: 'reject'
    };
    let job_rejected = Contract.update({acceptJobStatus},{ where:{JobId:jobId} });
    (job_rejected!==null) ? res.send("success"):res.send("error");
};

module.exports.WorkspaceReport = async (req,res, next) =>{
    let report = {
        JobId:req.body.JobId,
        UserId: req.body.UserId,
        report: req.body.report
    };
    let job_reported = JobReport.create(report);
    (job_reported!==null) ? res.send("success"):res.send("error");
};

