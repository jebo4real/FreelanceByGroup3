const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Qualification = require('../../models').Qualification;
const crypto = require('crypto');
let secret = "group3";
const path = require('path');
const multer = require('multer');

//render qualification page
module.exports.GetQualification = async (req, res, next) => {
    let user_qualification = await Qualification.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.Qualification  = user_qualification;
    console.log(user_qualification);
    req.session.qualificationChangeMessage = "";
    res.render(
        'profile/qualification',
        {
            qsuccess:'',
            qerror: '',
        }
    )
};

//render qualification page with response
module.exports.GetQualificationSuccess = async (req, res, next) => {
    let user_qualification = await Qualification.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.Qualification  = user_qualification;
    console.log(user_qualification);
    res.render(
        'profile/qualification',
        {
            qsuccess:'Information updated',
            qerror: '',
        }
    )
};

//update user qualification with picture upload
module.exports.UpdateQualification = async (req, res, next) => {
    let userqualification = {
        prof_cert: req.body.prof_cert,
        con_org: req.body.con_org,
        summary: req.body.summary
    };

    console.log(userqualification);

    Qualification.update(userqualification, { where: {id:req.body.id} }).then(response =>{
        req.session.qualificationChangeMessage = response != null;
        Qualification.findOne({
            where:{id:req.body.id}
        }).then(rows=>{
            req.session.user.qualification = rows;
            console.log(response);
            res.render(
                'profile/qualification',
                {
                    qsuccess:'Information Updated',
                    qerror: '',
                }
            )
        }).catch(e =>{
            res.render(
                'profile/qualification',
                {
                    qsuccess:'',
                    qerror: e,
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