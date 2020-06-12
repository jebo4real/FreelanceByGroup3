const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;
const Education = require('../../models').Education;
const Qualification = require('../../models').Qualification;
const crypto = require('crypto');
let secret = "group3";

module.exports.GetLogin = (req, res, next) => {
    //render login page
    if(req.session.loggedIn===true){
        res.redirect('/');
    }else{
        res.render(
            'auth/login',
            {
                page:'login'
            }
        )
    }
    
};

//perform login
module.exports.DoLogin = async (req, res, next) => {
    let userAccount = {
        username: req.body.username,
        password: hashPassword(req.body.password)
    };

    //set logged in session to false
    req.session.loggedIn = false;
    let ret_userAccount = await User.findOne({
        where: {email: userAccount.username},
        include: [UserAccount]
    });
    if (ret_userAccount !== null) {
        if (userAccount.password === ret_userAccount.UserAccount.password) {           
            req.session.user = ret_userAccount;
            req.session.loginSuccessMessage = "Login Successful";
            req.session.loggedIn = true;
            res.send({loginRes:"success"});
        } else {
            console.log("Wrong Password");
            req.session.loginErrorMessage = "Wrong Password";
            res.send({loginRes:"Wrong Password"});
        }
    } else {
        console.log("Wrong Username Or User does not exist");
        req.session.loginErrorMessage = "Wrong Username Or User does not exist";
        res.send({loginRes:"Wrong email"});
    }
};
//logout
module.exports.Logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err);
        req.user = null;
        res.redirect('/login');
    });
};

//method for hashing password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};