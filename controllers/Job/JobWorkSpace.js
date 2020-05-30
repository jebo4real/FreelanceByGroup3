const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;
const JobPayment = require('../../models').JobPayment;
const Chat = require('../../models').Chat;
const Contract = require('../../models').Contract;
const JobReport = require('../../models').JobReport;
const JobFile = require('../../models').JobFiles;
const multer = require('multer');
const path = require('path');

module.exports.GetWorkSpaceInfo = async (req, res, next) =>{
    let jobAppId = req.params.id;
    let jobAppDetail = await JobApplication.findOne({ where:{id:jobAppId}, include:User });
    let job = await Job.findOne({ where:{id:jobAppDetail.JobId}, include:[JobCategory, User] });
    let jobPayment = await JobPayment.findAll({ where:{JobId: jobAppDetail.JobId}, include:Job });
    let chat = await Chat.findAll({ where:{JobId:job.id} });
    let jobFiles = await JobFile.findAll({ where:{JobId:job.id}, include:User });

    res.locals.amountToPay = job.price * 100;
    res.locals.jobName = job.title;

    res.render(
        'job/workspace',
        {
            jobAppDetail,
            job,
            jobPayment,
            chat,
            jobFiles
        }
    )
};

module.exports.SendMessage = async (req, res, next) =>{
  let chat = {
      JobId: req.body.JobId,
      SenderId: req.body.SenderId,
      message: req.body.message
  };
  await Chat.create(chat);
  res.send("success");
};

module.exports.UploadFile = async (req, res, next) =>{

    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/jobfiles/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });

    const upload = multer({
        storage:storage
    }).single('jobfile');

    upload(req,res,(err)=>{
        if(err){
            console.log(err.toString());
        }else{
            console.log("uploaded");
            let jobFileInfo = {
                JobId: req.body.JobId,
                UserId: req.body.SenderId,
                filename: filenameGlobal
            };
            JobFile.create(jobFileInfo).then(response =>{
                res.redirect("/user/workspace/"+req.body.JobAppId);
            });

        }
    });

};

module.exports.ViewFile = async (req, res, next) =>{
    let filename = req.params.filename;
    console.log(filename);
    res.sendFile(path.dirname(app || process.mainModule.filename) + "public/jobfiles/"+filename);
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

