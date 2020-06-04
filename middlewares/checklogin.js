
module.exports.checkLoggedIn = function(req, res, next) {
    if(req.session.loggedIn){
        if(req.session.user.UserAccount.verified===true){
            next();
        }else{
            if(req.session.user.UserAccount.RoleId===3){
                next();
            }else{
                res.render("auth/success-register",{page:'signup'});
            }
        }       
    } else{
        res.redirect("/");
    }
     
};
