const { Op } = require("sequelize");
const Message = require('../../models').Message;
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;

module.exports.GetSelectMessageUsers = async (req, res, next)=>{
    let messageUsers = {};

    if(res.locals.user.UserAccount.RoleId===1){
        //select freelancers if user logged  in is client
        messageUsers = await User.findAll({
           include:[
               {
                   model:UserAccount,
                   as: 'UserAccount',
                   where: {RoleId:2}
               }
           ]
        });
    }else if(res.locals.user.UserAccount.RoleId===2){
        //select clients if user logged  in is freelancer
        messageUsers = await User.findAll({
            include:[
                {
                    model:UserAccount,
                    as: 'UserAccount',
                    where: {RoleId:1}
                }
            ]
        });
    }
    res.render(
        "message/message-users",
        {
            messageUsers
        }
    )
};

module.exports.GetMessageRoom = async (req, res, next)=>{
    let receiver = req.params.user;
    let messages = {};
    let allMessages = {};
    if(res.locals.user.UserAccount.RoleId===1) {
        messages = await Message.findAll({
            where: {
                [Op.and]: [
                    {ClientId:res.locals.user.id},
                    {FreelanceId:receiver}
                ]
            }
        });
        allMessages = await Message.findAll({
            where : {ClientId: res.locals.user.id},
            include: [
                {
                    model:User,
                    as: 'Freelance'
                }
            ],
            group: ['Message.FreelanceId']
        });
    }else if(res.locals.user.UserAccount.RoleId===2){
        messages = await Message.findAll({
            where: {
                [Op.and]: [
                    {ClientId:receiver},
                    {FreelanceId:res.locals.user.id}
                ]
            }
        });
        allMessages = await Message.findAll({
            where : {FreelanceId: res.locals.user.id},
            include: [
                {
                    model:User,
                    as: 'Client'
                }
            ],
            group: ['Message.ClientId']
        });
    }
    let receiverDetails = User.findOne({ where:{id:receiver} });
    console.log(allMessages);

    res.render(
        "message/message-room",
        {
            messages,
            receiver,
            receiverDetails,
            allMessages
        }
    );
};

module.exports.SendMessageUser = async (req, res, next)=>{
    let messageInfo= {};
    if(res.locals.user.UserAccount.RoleId===1) {
        messageInfo = {
            ClientId: res.locals.user.id,
            FreelanceId: req.body.receiver,
            message: req.body.message
        };
    }else if(res.locals.user.UserAccount.RoleId===2){
        messageInfo = {
            ClientId: req.body.receiver,
            FreelanceId: res.locals.user.id,
            message: req.body.message
        };
    }
    await Message.create(messageInfo);
    res.redirect("/user/message-room/"+req.body.receiver);
};