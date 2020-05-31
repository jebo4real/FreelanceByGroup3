const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;
const crypto = require('crypto');
let secret = "group3";
const path = require('path');
const multer = require('multer');

module.exports.GetPortfolio = async (req, res, next) => {
    let user_portfolio = await Portfolio.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.Portfolio  = user_portfolio;
    console.log(user_portfolio);
    res.render(
        'profile/portfolio'
    )
};

module.exports.GetPortfolioSuccess = async (req, res, next) => {
    req.session.portfoilioChangeMessage = "";
    let user_portfolio = await Portfolio.findOne({where:{UserId:res.locals.user.id} });
    req.session.user.Portfolio  = user_portfolio;
    console.log(user_portfolio);
    res.render(
        'profile/portfolio'
    )
};

module.exports.UpdatePortfolio = async (req, res, next) => {
    let filenameGlobal='';
    const storage = multer.diskStorage({
        destination:'./public/images/',
        filename: function(req,file,cb){
            filenameGlobal=file.fieldname+'-'+Date.now()+path.extname(file.originalname);
            cb(null,filenameGlobal);
        }
    });

    const upload = multer({
        storage:storage
    }).single('picture');

    upload(req,res,(err)=>{
        if(err){
            console.log(err.toString());
        }else{
            console.log("uploaded");
            let userPortfolio = {
                title: req.body.title,
                description: req.body.description,
                projectLinks: req.body.projectLinks,
                picture: filenameGlobal
            };
            if(filenameGlobal===""){
                delete userPortfolio.picture
            }
            Portfolio.update(userPortfolio, { where: {id:req.body.id} }).then(response =>{
                req.session.portfoilioChangeMessage = response != null;
                Portfolio.findOne({
                    where:{id:req.body.id}
                }).then(rows=>{
                    req.session.user.Portfolio = rows;
                    console.log(response);
                    res.redirect('/user/portfolio');
                });
            });

        }
    });

};

hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};