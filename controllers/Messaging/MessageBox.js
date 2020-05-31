const { Op } = require("sequelize");
const Message = require('../../models').Message;
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;

module.exports.GetInboxOutbox = async (req, res, next)=>{
  let inbox = await Message.findAll({
      where:{ReceiverId:res.locals.user.id},
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
  });
  let outbox = await Message.findAll({
      where:{SenderId:res.locals.user.id},
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
  });
  let messageUsers = {};
  if(res.locals.user.UserAccount.RoleId===1){
      messageUsers = await UserAccount.findAll({ where:{RoleId:2}, include: User});
  }else if(res.locals.user.UserAccount.RoleId===2){
      messageUsers = await UserAccount.findAll({ where:{RoleId:1}, include: User});
  }
console.log(messageUsers);
  res.render(
      "message/message-box",
      {
          inbox,
          outbox,
          messageUsers
      }
  )
};

module.exports.SendMessageFromBox = async (req, res, next)=>{
    let messageInfo = {
        SenderId: res.locals.user.id,
        ReceiverId: req.body.receiver,
        message: req.body.message
    };
    await Message.create(messageInfo);
    res.redirect("/user/message-room/"+req.body.receiver);
};