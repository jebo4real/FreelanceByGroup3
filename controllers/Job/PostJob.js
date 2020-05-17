const Job = require('../../models').Job;
const validator = require('validator');
const crypto = require('crypto');
let secret = "cv";
const nodeMailer = require('nodemailer');

module.exports.GetPostJob = (req, res, next) => {
    res.render(
        'job/post-job'
    )
};

module.exports.DoPostJob = async (req, res, next) => {

    let jobInfo = {
        ClientId: res.locals.user.id,
        title: req.body.title || '',
        details: req.body.details || '',
        timeLength: req.body.timeLength || '',
        price: req.body.price || '',
        skills: req.body.skills || '',
    };

    let job_created = await Job.create(jobInfo);
    if(job_created!==null){
        console.log("Job Posted successfully");
        res.send("success");
    }else{
        console.log("Error creating account ");
        res.send("error");
    }

};
