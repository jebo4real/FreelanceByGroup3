const { Op } = require("sequelize");
const Job = require('../models').Job;

module.exports.GetHowItWorks = async (req, res, next) => {
    res.render(
        'how-it-works',
        {
            page: 'how-it-works'
        }
    )
};