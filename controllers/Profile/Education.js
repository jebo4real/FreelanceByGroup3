const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Education = require('../../models').Education;
const crypto = require('crypto');
let secret = "group3";
const path = require('path');
const multer = require('multer');
const axios = require('axios');


//get all education
module.exports.GetAllEducations = async (req, res, next) => {
    let user_education = await Education.findAll({where:{UserId:res.locals.user.id} });
    req.session.user.Education  = user_education;
    res.render(
        'profile/educations'
    )
}


module.exports.GetEducation = async (req, res, next) => {
    let education_id = req.params.id;
    let user_education = await Education.findOne({where:{id:education_id} });
    let country = [
        {name: 'Ghana'},
        {name: 'Germany'},
    ];
    res.render(
        'profile/education',
        {
            user_education,
            country
        }
    )
 
    
};

//render education page
module.exports.GetAddEducation = async (req, res, next) => {
    let country = [
        {name: 'Ghana'},
        {name: 'Germany'},
    ];
    res.render(
        'profile/add-education',
        {
            country
        }
    )   
};

module.exports.AddEducation = async (req, res, next) =>{
    let country = {};
    let userEducation = {
        UserId: res.locals.user.id,
        country: req.body.edu_country,
        uni: req.body.uni,
        cert: req.body.cert,
        start_year: req.body.start_year,
        endyear: req.body.end_year
    };
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = response.data;
            Education.create(userEducation).then(rows=>{
                Education.findAll({
                    where:{UserId:res.locals.user.id}
                }).then(rows=>{
                    req.session.user.Education = rows;
                    console.log(response);
                });
            }).catch(e=>{
                console.log(e);
            });
            
        }).catch(error => {
            //api fails, add some countries
            console.log(error);
            country = [
                {name: 'Ghana'},
                {name: 'Germany'},
            ];
        });
        res.redirect('/user/educations');
    
};

//update user education
module.exports.UpdateEducation = async (req, res, next) => {
    let country = [
        {name: 'Ghana'},
        {name: 'Germany'},
    ];
    let userEducation = {
        country: req.body.edu_country,
        uni: req.body.uni,
        cert: req.body.cert,
        start_year: req.body.start_year,
        endyear: req.body.end_year
    };
    Education.update(userEducation, { where: {id:req.body.id} }).then(response =>{
        req.session.educationChangeMessage = response != null;
        Education.findAll({
            where:{userId:res.locals.user.id}
        }).then(rows=>{
            req.session.user.Education = rows;
            console.log(response);
        }).catch(e=>{
            console.log(e);
        });
    });
    res.redirect('/user/educations');

};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};