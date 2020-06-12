const { Op } = require("sequelize");
const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;
const JobApplication = require('../../models').JobApplication;
const User = require('../../models').User;
const JobPayment = require('../../models').JobPayment;
const UserPaymentInfo = require('../../models').UserPaymentInfo;
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
    let jobPayment = await JobPayment.findOne({ where:{JobId: jobAppDetail.JobId}, include:Job });
    let chat = await Chat.findAll({ where:{JobId:job.id} });
    let jobFiles = await JobFile.findAll({ where:{JobId:job.id}, include:User });
    let contract_details = await Contract.findOne({where:{JobId:job.id}});
    let user_payment = await UserPaymentInfo.findOne({where:{UserId:res.locals.user.id} });

    res.locals.amountToPay = job.price;
    res.locals.jobName = job.title;

    res.render(
        'job/workspace',
        {
            jobAppDetail,
            job,
            jobPayment,
            chat,
            contract_details,
            jobFiles,
            user_payment
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
    //let file = path.join(__dirname, 'public') + "/jobfiles/"+filename;
    let file = path.resolve('public/jobfiles/'+ filename);
    res.download(file, function (err) {
        if (err) {
            console.log("Error");
            console.log(err);
        } else {
            console.log("Success");
        }
    });
};

// module.exports.StartJob = async (req,res, next) =>{
//     let jobId = req.body.JobId;
//     let startJobStatus = {
//         status: 'start'
//     };
//     let job_started = Contract.update({startJobStatus},{ where:{JobId:jobId} });
//     let job_app = JobApplication.findOne({ where:{JobId:jobId} });
//     res.redirect("/user/workspace/"+job_app.id);
// };

module.exports.ReviewAndRateFreelancer = async (req,res, next) =>{
    let jobId = req.body.JobId;
    let ratings = {
        freelance_review: req.body.free_review,
        freelance_rating: req.body.free_rating
    };
    let rating_upd = Contract.update(ratings,{ where:{JobId:jobId} });
    console.log(ratings);
    console.log(jobId);
    console.log(rating_upd);
    (rating_upd!==null) ? res.send("success"):res.send("error");
};

module.exports.ReviewAndRateClient = async (req,res, next) =>{
    let jobId = req.body.JobId;
    let ratings = {
        client_review: req.body.client_review,
        client_rating: req.body.client_rating
    };
    let rating_upd = Contract.update(ratings,{ where:{JobId:jobId} });
    console.log(ratings);
    console.log(jobId);
    console.log(rating_upd);
    (rating_upd!==null) ? res.send("success"):res.send("error");
};

module.exports.CompleteJob = async (req,res, next) =>{
    let jobAppId = req.params.id;
    let job_app = await JobApplication.findOne({ where:{Id:jobAppId} });
    console.log(job_app.JobId);
    let job_con_started = await Contract.update({status:'completed'},{ where:{JobId:job_app.JobId} });
    res.redirect("/user/workspace/"+jobAppId);
};

module.exports.WorkspaceAcceptJob = async (req,res, next) =>{
    let jobAppId = req.params.id;
    let job_app = await JobApplication.findOne({ where:{Id:jobAppId} });
    console.log(job_app.JobId);
    let job_con_started = await Contract.update({status:'accepted'},{ where:{JobId:job_app.JobId} });
    res.redirect("/user/workspace/"+jobAppId);
};

module.exports.WorkspaceRejectJob = async (req,res, next) =>{
    let jobAppId = req.params.id;
    let job_app = await JobApplication.findOne({ where:{Id:jobAppId} });
    console.log(job_app.JobId);
    let job_con_started = await Contract.update({status:'rejected'},{ where:{JobId:job_app.JobId} });
    res.redirect("/user/workspace/"+jobAppId);
};

module.exports.WorkspaceSupport = async (req,res, next) =>{
    let report = {
        JobId:req.body.JobId,
        UserId: res.locals.user.id,
        report: req.body.support
    };
    let job_reported = JobReport.create(report);
    (job_reported!==null) ? res.send("success"):res.send("error");
};

module.exports.Invoice = async (req,res, next) =>{
    let jobAppId = req.params.id;
    let jobAppDetail = await JobApplication.findOne({ where:{id:jobAppId}, include:User });
    let job = await Job.findOne({ where:{id:jobAppDetail.JobId}, include:[JobCategory, User] });
    let jobPayment = await JobPayment.findAll({ where:{JobId: jobAppDetail.JobId}, include:Job });
    let contract_details = await Contract.findOne({where:{JobId:job.id}});

    res.locals.amountToPay = job.price * 100;
    res.locals.jobName = job.title;
    if(res.locals.user.UserAccount.RoleId===1){
        res.render(
            'job/invoice-new',
            {
                jobAppDetail,
                job,
                jobPayment,
                contract_details
            }
        );
    }else{
        res.render(
            'job/payout-new',
            {
                jobAppDetail,
                job,
                jobPayment,
                contract_details
            }
        );
    }
};

