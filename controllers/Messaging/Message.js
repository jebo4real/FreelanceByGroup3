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

        messages = await Message.findAll({
            where: {
                [Op.or]: [
                    {
                        [Op.and]:[
                            {SenderId:res.locals.user.id},
                            {ReceiverId:receiver}
                        ]
                    },
                    {
                        [Op.and]:[
                            {SenderId:receiver},
                            {ReceiverId:res.locals.user.id}
                        ]
                    }
                ]
            }
        });
        allMessages = await Message.findAll({
            where : {
                [Op.or]: [
                    {SenderId:res.locals.user.id},
                    {ReceiverId:res.locals.user.id}
                ]
            },
            include: [
                {
                    model:User,
                    as: 'Receiver'
                },
                {
                    model:User,
                    as: 'Sender'
                }
            ],
            group: ['Message.SenderId'],
            order: ['createdAt']
        });
    console.log(allMessages);
    let receiverDetails = await User.findOne({ where:{id:receiver} });


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
    let messageInfo = {
        SenderId: res.locals.user.id,
        ReceiverId: req.body.receiver,
        message: req.body.message
    };
    await Message.create(messageInfo);
    res.redirect("/user/message-room/"+req.body.receiver);
};