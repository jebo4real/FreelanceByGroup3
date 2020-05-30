const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const nodeMailer = require('nodemailer');

module.exports.GetVerify = (req, res, next) => {
    res.locals.verify = "empty";
    res.render(
        'auth/verify',
        {
            verify: res.locals.verify,
            page: 'verify'
        }
    )
};

module.exports.DoVerification = async (req, res, next) => {
    let email = req.params.email;
    let token = req.params.token;

    let ret_userAccount = await User.findOne({where: {email: email}, include: UserAccount});
    if(ret_userAccount!==null){
        if(ret_userAccount.UserAccount.token===token){
            let verify_user = UserAccount.update({verified:true}, {where:{id: ret_userAccount.UserAccount.id}});
            if(verify_user!==null){
                res.locals.verify = "success";
                SendMail(ret_userAccount.email);
            }else{
                res.locals.verify = "An error occurred during validation. Please try again";
            }
        }else{
            res.locals.verify = "Invalid token";
        }
    }else{
        res.locals.verify = "Invalid verification Link";
    }

    res.render(
        'auth/verify',
        {
            verify: res.locals.verify,
            page: 'verify'
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
        from: 'Group 3 Freelancer',
        subject: 'Verify your email',
        text: `Welcome to Group 3 freelancer. Your email has successfully been verified.`
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