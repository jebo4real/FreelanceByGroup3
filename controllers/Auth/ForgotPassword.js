const { Op } = require('sequelize');
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "group3";
const {SendMailResetPassword} = require('./ForgotPasswordMaill');

//render forgot password page
module.exports.GetForgotPassword = async (req, res, next) => {
    res.locals.display = false;
    res.render(
        'auth/forgot-password',
        {
            page: 'forgot-password'
        }
    );
};

//render reset password page
module.exports.GetResetPassword = async (req, res, next) => {
    res.locals.display = false;
    let token = req.params.token;
    let email = req.params.email;
    res.locals.email = email;
    res.locals.correct = false;
    (token === hashPassword(email)) ? res.locals.correct = true : res.locals.correct = false;
    res.render(
        'auth/reset-password',
        {
            correct:res.locals.correct,
            page: 'reset-password'
        }
    );
};

// perform password reset by generating a token plus a link amd sending to user email if email exists
module.exports.forgotPasswordEmail = async (req,res,next)=>{
    res.locals.display = true;
    let userAccount = {
        email: req.body.email
    };

    let ret_user = await User.findOne({ where:{email:userAccount.email} });
    if(ret_user!==null) {
        let token = hashPassword(userAccount.email);
        console.log("Token:  " + token);
        let hostname = req.headers.host;
        //send reset link to email
        res.locals.emailSent = !!SendMailResetPassword(userAccount.email, token, hostname);
        res.render(
            'auth/forgot-password',
            {
                emailSent: res.locals.emailSent,
                page: 'forgot-password'
            }
        )
    }else{
        res.locals.emailNotFound = true;
        res.render(
            'auth/forgot-password',
            {
                emailNotFound: res.locals.emailNotFound,
                page: 'forgot-password'
            }
        )
    }
};

//perform password
module.exports.DoResetPassword = async (req,res,next)=>{
    res.locals.display = true;
    res.locals.correct = true;
    let email = req.body.email;
    let newPassword = {
        password: hashPassword(req.body.password)
    };
    let user_info = await User.findOne({ where:{email:email} });
    let upd_userAccount = await UserAccount.update(newPassword,{ where: {UserId: user_info.id} });
    res.locals.changed = false;
    (upd_userAccount!==null) ? res.locals.changed = true : res.locals.changed = false;
    console.log("changed");
    res.render(
        'auth/reset-password',
        {
            changed:res.locals.changed,
            page: 'reset-password'
        }
    );
};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};