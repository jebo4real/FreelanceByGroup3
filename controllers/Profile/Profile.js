const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "group3";
const path = require('path');
const multer = require('multer');
const axios = require('axios');

//render profile page. Also get list of countries from an external api
module.exports.GetProfile = async (req, res, next) => {
    //Get list of countries from an external api
    let country = [];
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = response.data;
            req.session.profileChangeMessage = "";
            res.render(
                'profile/profile',
                {
                    country
                }
            )
        })
        .catch(error => {
            //api fails, add some countries
            console.log(error);
            country = [
                {name: 'Ghana'},
                {name: 'Germany'},
            ];
            res.render(
                'profile/profile',
                {
                    country
                }
            )
        });

};

//render profile page if update successful and show response
module.exports.GetProfileSuccess = async (req, res, next) => {
    //Get list of countries from an external api
    let country = [];
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = response.data;
            res.render(
                'profile/profile',
                {
                    country
                }
            )
        })
        .catch(error => {
            console.log(error);
            country = [
                {name: 'Ghana'},
                {name: 'Germany'},
            ];
            res.render(
                'profile/profile',
                {
                    country
                }
            )
        });
};

//update profile. Will remove picture adding from server side and use js to do it later
module.exports.UpdateProfile = async (req, res, next) => {
    //use multer to upload file to public/images folder
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
                     res.redirect('/user/profile/success');
                 });
            });

        }
    });

};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};