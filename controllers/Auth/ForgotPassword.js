const { Op } = require('sequelize');
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "cv";
const nodeMailer = require('nodemailer');
const errorLog = require('../../logger/logger').logger;

module.exports.GetForgotPassword = async (req, res, next) => {
    res.locals.display = false;
    res.render(
        'auth/forgot-password'
    );
    errorLog.info("forgot password page rendered");
};
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
            correct:res.locals.correct
        }
    );
};

module.exports.forgotPasswordEmail = async (req,res,next)=>{
    res.locals.display = true;
    let userAccount = {
        email: req.body.email
    };

    let ret_user = await User.findOne({ where:{email:userAccount.email} });
    if(ret_user!==null) {
        let token = hashPassword(userAccount.email);
        console.log("Token:  " + token);
        res.locals.emailSent = !!SendMail(userAccount.email, token);
        res.render(
            'auth/forgot-password',
            {
                emailSent: res.locals.emailSent
            }
        )
    }else{
        res.locals.emailNotFound = true;
        res.render(
            'auth/forgot-password',
            {
                emailNotFound: res.locals.emailNotFound
            }
        )
    }
};

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
            changed:res.locals.changed
        }
    );
};

const SendMail = (emailReceiver, token)=>{
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jay4node@gmail.com',
            pass: 'Nodemailer4@'
        }
    });
    const mailOptions = {
        to: emailReceiver,
        from: 'JCV Builder',
        subject: 'Reset Password',
        text: `Click on the link below to reset your password.\n\n
                http://localhost:3000/reset-password/${token}/${emailReceiver}`
    };
    transporter.sendMail(mailOptions)
        .then(() => {
            console.log("Email sent successfully");
        }).catch((err) => {
        console.log(err.message);
        return (err.message);
    });

};

hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};