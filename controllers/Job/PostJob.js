const Job = require('../../models').Job;
const JobCategory = require('../../models').JobCategory;

module.exports.GetPostJob = async (req, res, next) => {
    let category = await JobCategory.findAll();
    res.render(
        'job/post-job',
        {
            category,
            successMessage:'',
            errorMessage:''
        }
    );
};

module.exports.DoPostJob = async (req, res, next) => {

    let jobInfo = {
        ClientId: res.locals.user.id,
        title: req.body.title || '',
        details: req.body.details || '',
        timeLength: req.body.timeLength || '',
        price: req.body.price || '',
        skills: req.body.skills || '',
        CatId: req.body.category || ''
    };

    let job_created = await Job.create(jobInfo);
    if(job_created!==null){
        console.log("Job Posted successfully");
        let category = await JobCategory.findAll();
        res.render(
            'job/post-job',
            {
                category,
                successMessage:'Job Posted successfully',
                errorMessage:''
            }
        )
    }else{
        let category = await JobCategory.findAll();
        console.log("Error posting job");
        res.render(
            'job/post-job',
            {
                category,
                errorMessage:'Error Posting Job',
                successMessage:''
            }
        );
    }

};
