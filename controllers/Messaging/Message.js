const { Op } = require("sequelize");
const Sequelize = require('../../models').sequelize;
const Message = require('../../models').Message;
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;

module.exports.GetSelectMessageUsers = async (req, res, next)=>{
    let messageUsers = {};
    if(res.locals.user.UserAccount.RoleId===1){
        //select freelancers if user logged  in is client
        messageUsers = await User.findAll({
           include:[{model:UserAccount,as: 'UserAccount', where: {RoleId:2} }]
        });
    }else if(res.locals.user.UserAccount.RoleId===2){
        //select clients if user logged  in is freelancer
        messageUsers = await User.findAll({
            include:[{model:UserAccount,as: 'UserAccount', where: {RoleId:1} }]
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
    let inbox = await Message.findAll({
        where:{ReceiverId:res.locals.user.id},
        include: [{model:User,as: 'Receiver'},{ model:User,as: 'Sender'}],
    });
    //select messages involving the receiver and user logged in( either as sender or receiver)
       let messages = await Message.findAll({
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
       //select all messages
    let allMessages = await Message.findAll({
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
            order: [['createdAt', 'DESC']]
        });
    console.log(allMessages);
    //get receiver details to display on message room page
    let receiverDetails = await User.findOne({ where:{id:receiver} });
    res.render(
        "message/message-room",
        {
            messages,
            receiver,
            receiverDetails,
            allMessages,
            inbox
        }
    );
};


//Get some message
module.exports.GetRandomMessageRoom = async (req, res, next)=>{
    let receiverdetails = await User.findOne({
        include: [
            {
                model:UserAccount,
                as: 'UserAccount',
                where:{RoleId:1}
            
            }
        ],
        //order: Sequelize.literal('rand()')
    });
    console.log(receiverdetails);
    let inbox = await Message.findAll({
        where:{ReceiverId:res.locals.user.id},
        include: [{model:User,as: 'Receiver'},{ model:User,as: 'Sender'}],
    });
    //select messages involving the receiver and user logged in( either as sender or receiver)
       let messages = await Message.findAll({
            where: {
                [Op.or]: [
                    {
                        [Op.and]:[
                            {SenderId:res.locals.user.id},
                            {ReceiverId:receiverdetails.id}
                        ]
                    },
                    {
                        [Op.and]:[
                            {SenderId:receiverdetails.id},
                            {ReceiverId:res.locals.user.id}
                        ]
                    }
                ]
            }
        });
       //select all messages
    let allMessages = await Message.findAll({
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
            order: [['createdAt', 'DESC']]
        });
    console.log(allMessages);
    //get receiver details to display on message room page
    let receiverDetails = await User.findOne({ where:{id:receiverdetails.id} });
    let receiver = receiverdetails.id;

    res.render(
        "message/message-room",
        {
            messages,
            receiver,
            receiverDetails,
            allMessages,
            inbox
        }
    );
};


//send message from message room
module.exports.SendMessageUser = async (req, res, next)=>{
    let messageInfo = {
        SenderId: res.locals.user.id,
        ReceiverId: req.body.receiver,
        message: req.body.message
    };
    await Message.create(messageInfo);
    res.redirect("/user/message-room/"+req.body.receiver);
};