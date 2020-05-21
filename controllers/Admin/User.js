const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const nodeMailer = require('nodemailer');

module.exports.GetUsers = async (req, res, next) => {
    let userCat = req.params.category;
    let title = "All Users";
    let users = await UserAccount.findAll({include: User});
    if (userCat === "all") {
        users = await UserAccount.findAll({include: User});
    } else if (userCat === "client") {
        users = await UserAccount.findAll({ where:{RoleId:1}, include: User});
        title = "Clients";
    } else if (userCat === "freelancer") {
        users = await UserAccount.findAll({ where:{RoleId:2}, include: User});
        title = "Freelancers";
    }
    console.log(users);
    res.render(
        'admin/users',
        {
            users,
            title
        }
    )
};

module.exports.Accept = async (req, res, next)  =>{
    let uInfo = {
        uAccId: req.body.uAccId,
        email: req.body.email
    };
    let verifyStatus = {
        verified: true,
        blocked: false
    };
    let user_accepted = UserAccount.update(verifyStatus,{where:{id:uInfo.uAccId} });
    if (user_accepted != null) {
        SendMail(uInfo.email, "Your account registration request has been accepted. You can now login.");
        res.send("success");
    } else {
        res.send("error");
    }

};

module.exports.Reject = async (req, res, next)  =>{
    let uInfo = {
        uAccId: req.body.uAccId,
        email: req.body.email
    };
    let verifyStatus = {
        verified: true,
        blocked: true
    };
    let user_rejected = UserAccount.update(verifyStatus,{where:{id:uInfo.uAccId} });
    if (user_rejected != null) {
        SendMail(uInfo.email, "Your account registration request has been denied.");
        res.send("success");
    } else {
        res.send("error");
    }
};

module.exports.Block = async (req, res, next)  =>{
    let uInfo = {
        uAccId: req.body.uAccId,
        email: req.body.email
    };
    let blockStatus = {
        blocked: true
    };
    let user_blocked = UserAccount.update(blockStatus,{where:{id:uInfo.uAccId} });
    if (user_blocked != null) {
        SendMail(uInfo.email, "Your account has been blocked.");
        res.send("success");
    } else {
        res.send("error");
    }
};

module.exports.UnBlock = async (req, res, next)  =>{
    let uInfo = {
        uAccId: req.body.uAccId,
        email: req.body.email
    };
    let blockStatus = {
        blocked: false
    };
    let user_unblocked = UserAccount.update(blockStatus,{where:{id:uInfo.uAccId} });
    if (user_unblocked != null) {
        SendMail(uInfo.email, "Your account has been unblocked.");
        res.send("success");
    } else {
        res.send("error");
    }
};

const SendMail = (emailReceiver, message)=>{
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jay4node@gmail.com',
            pass: 'Nodemailer4@'
        }
    });
    const mailOptions = {
        to: emailReceiver,
        from: 'Freelancer',
        subject: 'Account Status',
        text: message
    };
    transporter.sendMail(mailOptions)
        .then(() => {
            console.log("Email sent successfully");
            return 1;
        }).catch((err) => {
        console.log(err.message);
        return (err.message);
    });

};
