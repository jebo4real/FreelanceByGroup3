
module.exports.checkLoggedIn = function(req, res, next) {
    (req.session.loggedIn)?  next() : res.redirect("/");
};
