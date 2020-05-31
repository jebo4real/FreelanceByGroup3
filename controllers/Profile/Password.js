const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const crypto = require('crypto');
let secret = "group3";

module.exports.GetChangePassword = (req, res, next) => {
    res.render(
        'profile/change-password'
    )
};

module.exports.UpdatePassword = async (req, res, next) => {
    let checkPass = await UserAccount.findOne({ where: {id: req.body.id, password:hashPassword(req.body.oldpassword)} });
    console.log(checkPass);
    if(checkPass==null){
        req.session.passwordChangeMessage = "Old password is incorrect";
    }else {
        if (req.body.password1 != req.body.password2) {
            req.session.passwordChangeMessage = "Passwords do not match";
        } else {
            let userDetails = {
                password: hashPassword(req.body.password1),
            };
            let response = await UserAccount.update(userDetails, {where: {id: req.body.id}});
            console.log(response);
            if (response != null) {
                req.session.passwordChangeMessage = "Update Successful";
            } else {
                req.session.passwordChangeMessage = "Error Updating";
            }
        }
    }
    res.locals.disPass = true;
    res.redirect('/user/change-password');
};

hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};