const Notification = require('../models').Notification;
const nodeMailer = require('nodemailer');

module.exports.Notify = (title, message, ReceiverId) =>{
    let notifyDetails = {
        title,
        message,
        ReceiverId
    };
    let notify = Notification.create(notifyDetails);
    console.log(notify);
};

module.exports.NotifyMail = (title, message, ReceiverEmail) =>{
    SendMail(title, message, ReceiverEmail);
};

const SendMail = (subject,message,emailReceiver)=>{
    let transporter = nodeMailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jay4node@gmail.com', // generated ethereal user
            pass: 'Nodemailer4@'
        }
    });
    const mailOptions = {
        to: emailReceiver,
        from: 'Group3 Freelancer',
        subject: subject,
        html: message
    };
    transporter.sendMail(mailOptions)
        .then(() => {
            console.log("Email sent successfully");
            return 1;
        }).catch((err) => {
        console.log(err.message);
        return (err.message);
    });

};