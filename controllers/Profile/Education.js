const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Education = require('../../models').Education;
const crypto = require('crypto');
let secret = "group3";
const path = require('path');
const multer = require('multer');
const axios = require('axios');

//render education page
module.exports.GetEducation = async (req, res, next) => {
    let user_education = await Education.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.Education  = user_education;
    console.log(user_education);
    let country = [];
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = response.data;
            req.session.profileChangeMessage = "";
            res.render(
                'profile/education',
                {
                    success:'',
                    error: '',
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
                'profile/education',
                {
                    success:'',
                    error: '',
                    country
                }
            )
        });
};

//render education page with response
module.exports.GetEducationSuccess = async (req, res, next) => {
    let user_education = await Education.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.Education  = user_education;
    console.log(user_education);
    let country = [];
    axios.get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            country = response.data;
            req.session.profileChangeMessage = "";
            res.render(
                'profile/education',
                {
                    success:'Information Updated',
                    error: '',
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
                'profile/education',
                {
                    success:'Information Updated',
                    error: '',
                    country
                }
            )
        });
};

//update user education with picture upload
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
        Education.findOne({
            where:{id:req.body.id}
        }).then(rows=>{
            req.session.user.Education = rows;
            console.log(response);
            res.render(
                'profile/education',
                {
                    success:'Information Updated',
                    error: '',
                    country
                }
            )
        }).catch(e=>{
            res.render(
                'profile/education',
                {
                    success:'',
                    error: e,
                    country
                }
            )
        });
    });

};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};