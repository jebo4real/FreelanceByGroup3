const { Op } = require("sequelize");
const Message = require('../../models').Message;
const User = require('../../models').User;
const UserAccount = require('../../models').UserAccount;


module.exports.GetInboxOutbox = async (req, res, next)=>{
    //select inbox(messages as user being receiver)
  let inbox = await Message.findAll({
      where:{ReceiverId:res.locals.user.id},
      include: [{model:User,as: 'Receiver'},{ model:User,as: 'Sender'}],
  });
    //select outbox(messages as user being sender)
  let outbox = await Message.findAll({
      where:{SenderId:res.locals.user.id},
      include: [{model:User,as: 'Receiver'},{model:User, as: 'Sender'}],
  });

  let messageUsers = {};
  //display freelancer on page if user logged in is a client and vice versa
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

//send message from message box page(not implemented)
module.exports.SendMessageFromBox = async (req, res, next)=>{
    let messageInfo = {
        SenderId: res.locals.user.id,
        ReceiverId: req.body.receiver,
        message: req.body.message
    };
    await Message.create(messageInfo);
    res.redirect("/user/message-room/"+req.body.receiver);
};