const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;
const Education = require('../../models').Education;
const Qualification = require('../../models').Qualification;
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
                page:'signup',
                signUpErrorMessage:'',
                signUpSuccessMessage:''

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
        res.render(
            'auth/signup',
            {
                page:'signup',
                signUpErrorMessage: 'User by that email already exists'
            }
        );
    }else{
        let user_Account = await User.create(userInfo, { include: [UserAccount] } );
        if(user_Account.id!==null){
            //set up portfolio for user
            let user_Portfolio = await Portfolio.create({UserId:user_Account.id});
            let user_Education = await Education.create({UserId:user_Account.id});
            let user_Qualification = await Qualification.create({UserId:user_Account.id});
            if(user_Portfolio.id!==null) {
                console.log("Account Created successfully");
                let hostname = req.headers.host;
                try{
                    req.session.uemail = userInfo.email;
                    req.session.utoken = token;
                }catch(e){
                    console.log(e);
                }
                //send verification email
                SendMailVerify(userInfo.email, token, hostname);
                res.render("auth/success-register",{page:'signup',signUpSuccessMessage:'An email has been sent to your account to verify.'});
            }else{
                console.log("Profile could not be created");
                req.session.signUpErrorMessage = "Error creating account";
                res.render(
                    'auth/signup',
                    {
                        page:'signup',
                        signUpErrorMessage: 'Error creating account'
                    }
                );
            }
        }else{
            console.log("Error creating account ");
            res.render(
                'auth/signup',
                {
                    page:'signup',
                    signUpErrorMessage: 'Error creating account'
                }
            );
        }
    }

};


//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};