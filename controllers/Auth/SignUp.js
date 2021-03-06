const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;
const crypto = require('crypto');
let secret = "group3";
const jwt = require('jsonwebtoken');
const {SendMailVerify} = require('./VerificationEmail');

module.exports.GetSignUp = (req, res, next) => {
    //render sign up page
    if(req.session.loggedIn===true){
        res.redirect('/');
    }else{
        res.render(
            'auth/signup',
            {
                page:'signup'
            }
        )
    }
};

//perform signup operation. Also set up a portfolio for freelancers with empty data
module.exports.DoSignUp = async (req, res, next) => {
    //generate a token for email verification
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

    //check if email is already used
    let user = await User.findOne({ where:{email:req.body.email} });
    if(user!==null && user.email===req.body.email){
        console.log("User already exists. Log in");
        req.session.signUpErrorMessage = "User by that email already exists";
    }else{
        let user_Account = await User.create(userInfo, { include: [UserAccount] } );
        if(user_Account.id!==null){
            //set up portfolio for user
            let user_Portfolio = await Portfolio.create({UserId:user_Account.id});
            if(user_Portfolio.id!==null) {
                console.log("Account Created successfully");
                req.session.signUpSuccessMessage = "An email has been sent to your account to verify.";
                let hostname = req.headers.host;
                res.locals.userEmail = userInfo.email;
                res.locals.token = token;
                //send verification email
                SendMailVerify(userInfo.email, token, hostname);
                res.render("auth/success-register",{page:'signup'});
            }else{
                console.log("Profile could not be created");
                req.session.signUpErrorMessage = "Error creating account";
            }
        }else{
            console.log("Error creating account ");
            req.session.signUpErrorMessage = "Error creating account";
        }
    }
    res.redirect('/signUp');

};


//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};