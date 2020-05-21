const JobCategory = require('../../models').JobCategory;

module.exports.GetJobCategories = async (req, res, next) => {
    let categories = await JobCategory.findAll();
    res.render(
        'admin/job-categories',
        {
            categories
        }
    )
};

module.exports.DoAddJobCategory = async (req, res, next) => {
    let jobCat = {
        name: req.body.name,
    };

    let jobCat_created = await JobCategory.create(jobCat);
    if(jobCat_created!==null){
        console.log("Category successfully");
        res.send("success");
    }else{
        console.log("Error creating category ");
        res.send("error");
    }

};

module.exports.DoUpdateJobCategory = async (req, res, next) => {
    let id = req.body.id;
    let jobCat = {
        name: req.body.name,
    };

    let jobCat_created = await JobCategory.update(jobCat, { where:{id:id} });
    if(jobCat_created!==null){
        console.log("Category Updated successfully");
        res.send("success");
    }else{
        console.log("Error updating category ");
        res.send("error");
    }

};

module.exports.DoDeleteJobCategory = async (req, res, next) => {
    let jobCatId = req.body.id;

    let jobCat_created = await JobCategory.destroy({ where: {id:jobCatId} });
    if(jobCat_created!==null){
        console.log("Job Deleted successfully");
        res.send("success");
    }else{
        console.log("Error deleting category ");
        res.send("error");
    }

};
