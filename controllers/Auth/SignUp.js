const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const validator = require('validator');
const crypto = require('crypto');
let secret = "cv";
const nodeMailer = require('nodemailer');

module.exports.GetSignUp = (req, res, next) => {
    res.render(
        'auth/signup'
    )
};

module.exports.DoSignUp = async (req, res, next) => {
    let validationErrors = [];
    let userInfo = {
        firstname: req.body.firstname || '',
        lastname: req.body.lastname || '',
        email: req.body.email || '',
        mobile: req.body.mobile || '',
        UserAccount: [
            {
                username: req.body.username || '',
                password: hashPassword(req.body.password),
                RoleId: req.body.role || 1,
            }
        ],
    };

    let user = await User.findOne({ where:{email:req.body.email} });
    if(user!==null){
        console.log("User already exists. Log in");
        validationErrors.push("User by that email already exists");
        req.session.signUpErrorMessage = "User by that email already exists";
    }else{
        let user_Account = await User.create(userInfo, { include: [UserAccount] } );
        if(user_Account!==null){
            console.log("Account Created successfully");
            // req.session.user = user_Account;
            // req.session.loggedIn = true;
            req.session.signUpSuccessMessage = "Account Created successfully. Login";
            SendMail(userInfo.email);
        }else{
            console.log("Error creating account ");
            validationErrors.push("Error creating account");
            req.session.signUpErrorMessage = "Error creating account";
        }
    }
    res.redirect('/signUp');

};

const SendMail = (emailReceiver)=>{
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jay4node@gmail.com', // generated ethereal user
            pass: 'Nodemailer4@'
        }
    });
    const mailOptions = {
        to: emailReceiver,
        from: 'JCV Builder',
        subject: 'Welcome',
        text: `Welcome to group 3 freelancer`
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

hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};