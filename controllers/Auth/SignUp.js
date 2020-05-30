const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;
const crypto = require('crypto');
let secret = "group3";
const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');

module.exports.GetSignUp = (req, res, next) => {
    res.render(
        'auth/signup',
        {
            page:'signup'
        }
    )
};

module.exports.DoSignUp = async (req, res, next) => {
    let validationErrors = [];
    const token = jwt.sign(
        { userId: req.body.email },
        'Group3Freelance',
        { expiresIn: '24h' });

    let userInfo = {
        firstname: req.body.firstname || '',
        lastname: req.body.lastname || '',
        email: req.body.email || '',
        mobile: req.body.mobile || '',
        UserAccount: [
            {
                username: req.body.username || '',
                password: hashPassword(req.body.password),
                RoleId: req.body.role,
                verified: false,
                token: token,
            }
        ]
    };

    let user = await User.findOne({ where:{email:req.body.email} });
    if(user!==null && user.email===req.body.email){
        console.log("User already exists. Log in");
        req.session.signUpErrorMessage = "User by that email already exists";
    }else{
        let user_Account = await User.create(userInfo, { include: [UserAccount] } );
        if(user_Account.id!==null){
            let user_Portfolio = await Portfolio.create({UserId:user_Account.id});
            if(user_Portfolio.id!==null) {
                console.log("Account Created successfully");
                req.session.signUpSuccessMessage = "An email has been sent to your account to verify.";
                let hostname = req.headers.host;
                SendMail(userInfo.email, token, hostname);
            }else{
                console.log("Profile could not be created");
                req.session.signUpErrorMessage = "Error creating account";
            }
        }else{
            console.log("Error creating account ");
            validationErrors.push("Error creating account");
            req.session.signUpErrorMessage = "Error creating account";
        }
    }
    res.redirect('/signUp');

};

const SendMail = (emailReceiver, token, hostname)=>{
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
        text: `Welcome to Group 3 freelancer. Click on the link below to complete registration \n`+
            `http://`+hostname+`/verification/`+emailReceiver+`/`+token+``
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