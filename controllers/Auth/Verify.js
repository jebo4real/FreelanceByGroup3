const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const {SendMailConfirmVerify} = require('./ConfirmVerification');

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
                //SendMailConfirmVerify(ret_userAccount.email, token);
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

