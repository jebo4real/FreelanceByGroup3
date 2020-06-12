const { Op } = require("sequelize");
const Job = require('../../models').Job;
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;
const Portfolio = require('../../models').Portfolio;
const Education = require('../../models').Education;
const Contract = require('../../models').Contract;

module.exports.GetFreelancers = async (req, res, next) => {
    let frees = await User.findAll( {
        include: [
            {
                model: UserAccount,
                as: 'UserAccount',
                where:{RoleId:2}
            }
        ],
        order:[['createdAt', 'DESC']],
        limit:10,
        offset:0
    });
    let countries = await User.findAll({
        include: [
            {
                model: UserAccount,
                as: 'UserAccount',
                where:{RoleId:2}
            }
        ]
    });
    console.log(countries);
    let searchResult = "All Freelancers";
    res.render(
        'freelancers',
        {
            frees,
            countries,
            searchResult,
            page: 'freelancers'
        }
    )
};

module.exports.GetSingleFreelancer = async (req, res, next) => {
    let free_id = req.params.id;
    let free = await User.findOne({
        where :{id:free_id}
    });
    let freePortfolio = await Portfolio.findAll({
        where :{UserId:free_id}
    });
    let freeEducation = await Education.findOne({
        where :{UserId:free_id}
    });
    let searchResult = "All Freelancers";
    res.render(
        'single-freelancer',
        {
            free,
            freePortfolio,
            freeEducation,
            searchResult,
            page: 'freelancers'
        }
    )
}

module.exports.GetFreelancerCountryAndSearch = async (req, res, next) => {
    let searchParams = {};
    let frees= {};
    let countries = await User.findAll({
        include: [
            {
                model: UserAccount,
                as: 'UserAccount',
                where:{RoleId:2}
            }
        ]
    });
    console.log(countries);
    let searchResult = "All Freelancers";
    if(req.body.country!=="" && req.body.keyword!=="") {
        searchParams = {
            country: req.body.country || '',
            firstname: '%'+req.body.keyword+'%' || '',
        };
        if(req.body.country==="all"){
            frees = await User.findAll({
                where: {
                    firstname: {
                        [Op.like]: searchParams.firstname
                    }
                },
                include: [
                    {
                        model: UserAccount,
                        as: 'UserAccount',
                        where:{RoleId:2}
                    }
                ]
            });
            searchResult = "'"+req.body.keyword + "' search results";
        }else {
            frees = await User.findAll({
                where: {
                    [Op.and]: [
                        {
                            firstname: {
                                [Op.like]: searchParams.firstname
                            }
                        },
                        {country: searchParams.country}
                    ]
                },
                include: [
                    {
                        model: UserAccount,
                        as: 'UserAccount',
                        where:{RoleId:2}
                    }
                ]
            });
            searchResult = "'"+req.body.keyword + "' search results";
        }
    }else if(req.body.country!==""){
        searchParams = {
            country: req.body.country || ''
        };
        if(req.body.country==="all"){
            frees = await User.findAll( {
                include: [
                    {
                        model: UserAccount,
                        as: 'UserAccount',
                        where:{RoleId:2}
                    }
                ]
            });
        }else {
            frees = await User.findAll({
                where: searchParams, 
                include: [
                    {
                        model: UserAccount,
                        as: 'UserAccount',
                        where:{RoleId:2}
                    }
                ]
            });
            console.log(frees);
            searchResult =  "Search results";
        }

    }else if(req.body.keyword!==""){
        let firstname = '%'+req.body.keyword+'%' || '';
        frees = await User.findAll({
            where: {
                firstname: {
                    [Op.like]: firstname
                }
            },
            include: [
                {
                    model: UserAccount,
                    as: 'UserAccount',
                    where:{RoleId:2}
                }
            ]
        });
        searchResult = "'"+req.body.keyword + " search results";
    }else{
        frees = await User.findAll({
            include: [
                {
                    model: UserAccount,
                    as: 'UserAccount',
                    where:{RoleId:2}
                }
            ]
        });
    }
    let freeCount = Object.keys(frees).length;
    searchResult+="..."+freeCount+" freelancers";
    console.log(frees);
    res.render(
        'freelancers',
        {
            frees,
            freeCount,
            countries,
            page: 'freelancers',
            page_no: 1,
            searchResult
        }
    )
};

