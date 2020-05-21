const validator = require('validator');
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "cv";

module.exports.GetLogin = (req, res, next) => {
    res.render(
        'auth/login'
    )
};

module.exports.DoLogin = async (req, res, next) => {
    let userAccount = {
        username: req.body.username,
        password: hashPassword(req.body.password)
    };

    req.session.loggedIn = false;
    let ret_userAccount = await User.findOne({where: {email: userAccount.username}, include: UserAccount});
    if (ret_userAccount !== null) {
        if (userAccount.password === ret_userAccount.UserAccount.password) {
            req.session.user = ret_userAccount;
            req.session.loginSuccessMessage = "Login Successful";
            req.session.loggedIn = true;
            res.send("success");
        } else {
            console.log("Wrong Password");
            req.session.loginErrorMessage = "Wrong Password";
            res.send("Wrong Password");
        }
    } else {
        console.log("Wrong Username Or User does not exist");
        req.session.loginErrorMessage = "Wrong Username Or User does not exist";
        res.send("Wrong email");
    }
};

module.exports.Logout = (req, res, next) => {
    req.session.destroy((err) => {
        if (err) console.log('Error : Failed to destroy the session during logout.', err);
        req.user = null;
        res.redirect('/');
    });
};

hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};