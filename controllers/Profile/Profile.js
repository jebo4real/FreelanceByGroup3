const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "cv";
const path = require('path');
const multer = require('multer');

module.exports.GetProfile = (req, res, next) => {
    res.render(
        'profile/profile'
    )
};

module.exports.UpdateProfile = async (req, res, next) => {
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });

    const upload = multer({
        storage:storage
    }).single('picture');

    upload(req,res,(err)=>{
        if(err){
            console.log(err.toString());
        }else{
            console.log("uploaded");
            let userDetails = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                gender: req.body.gender,
                dob: req.body.dob,
                jobTitle: req.body.jobTitle || '',
                email: req.body.email,
                mobile: req.body.mobile,
                country: req.body.country,
                city: req.body.city,
                picture: filenameGlobal
            };
            if(filenameGlobal===""){
                delete userDetails.picture
            }
            User.update(userDetails, { where: {id:req.body.id} }).then(response =>{
                req.session.profileChangeMessage = response != null;
                 User.findOne({ where:{id:req.body.id} , include: UserAccount }).then(rows=>{
                     req.session.user = rows;
                     console.log(response);
                     res.redirect('/user/profile');
                 });
            });

        }
    });

};

hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};