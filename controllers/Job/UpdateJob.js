const Job = require('../../models').Job;
const JobApplication = require('../../models').JobApplication;

module.exports.UpdateJob = async (req, res, next) => {
    let jobInfo = {
        title: req.body.title || '',
        details: req.body.details || '',
        timeLength: req.body.timeLength || '',
        price: req.body.price || '',
        skills: req.body.skills || '',
        CatId: req.body.category || ''
    };

    let job_updated = await Job.update(jobInfo, { where:{id:req.body.id} });
    if(job_updated!==null){
        console.log("Job Updated successfully");
        res.send("success");
    }else{
        console.log("Error creating account ");
        res.send("Error Updating Jb Details");
    }
};

module.exports.DeleteJob = async (req, res, next) => {
    let jobId = req.body.id;
    let jobApp_deleted = await JobApplication.destroy({where:{JobId:jobId}});
    let job_deleted = await Job.destroy({where:{id:jobId}});
    if(job_deleted !== null && jobApp_deleted !== null) {
        res.send("success");
    }else{
        res.send("error");
    }
};
