const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;
const crypto = require('crypto');
let secret = "group3";
const path = require('path');
const multer = require('multer');

module.exports.GetAllPortfolios = async (req, res, next) => {
    let user_portfolios = await Portfolio.findAll({where:{UserId:res.locals.user.id} });
    req.session.user.Portfolio  = user_portfolios;
    res.render(
        'profile/portfolios'
    )
}

//render portfolio page
module.exports.GetPortfolio = async (req, res, next) => {
    let portfolio_id = req.params.id;
    let user_portfolio = await Portfolio.findOne({where:{id:portfolio_id} });
    res.render(
        'profile/portfolio',
        {
            user_portfolio
        }
    )
};

//render portfolio page with response
module.exports.GetPortfolioSuccess = async (req, res, next) => {
    let portfolio_id = req.params.id;
    let user_portfolio = await Portfolio.findOne({where:{id:portfolio_id} });
    res.render(
        'profile/portfolio',
        {
            user_portfolio
        }
    )
};

module.exports.GetAddPortfolio = async (req, res, next) =>{
    res.render(
        'profile/add-portfolio',
    )
};

module.exports.AddPortfolio = async (req, res, next) =>{
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
            res.redirect('/user/portfolios');
        }else{
            console.log("uploaded");
            let userPortfolio = {
                UserId: res.locals.user.id,
                title: req.body.title,
                description: req.body.description,
                projectLinks: req.body.projectLinks,
                picture: filenameGlobal
            };
            if(filenameGlobal===""){
                delete userPortfolio.picture
            }
            Portfolio.create(userPortfolio).then(response =>{
                req.session.portfoilioChangeMessage = response != null;
                Portfolio.findAll({
                    where:{UserId:res.locals.user.id}
                }).then(rows=>{
                    req.session.user.Portfolio = rows;
                    console.log(response);
                });
            });

        }
    });
    res.redirect('/user/portfolios');
};


//update user portfolio with picture upload
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
                UserId: res.locals.user.id,
                title: req.body.title,
                description: req.body.description,
                projectLinks: req.body.projectLinks,
                picture: filenameGlobal
            };
            if(filenameGlobal===""){
                delete userPortfolio.picture
            }
            Portfolio.update(userPortfolio,{where:{id:req.body.id}}).then(response =>{
                req.session.portfoilioChangeMessage = response != null;
                Portfolio.findAll({
                    where:{UserId:res.locals.user.id}
                }).then(rows=>{
                    req.session.user.Portfolio = rows;
                    console.log(response);
                    res.redirect('/user/portfolio/'+req.body.id+"/success");
                });
            });

        }
    });

};

//hash password
hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};