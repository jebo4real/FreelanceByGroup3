const nodeMailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const {client_id, client_secret, refresh_token} = require('../../config/keys');

//set up google OAuth2 client
const oauth2Client = new OAuth2(
    client_id, // ClientID
    client_secret, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

//set credentials to get access token
oauth2Client.setCredentials({
    refresh_token: refresh_token
});
const accessToken = oauth2Client.getAccessToken();

//send email for reset password
module.exports.SendMailResetPassword = (emailReceiver, token, hostname)=>{
    let transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
            type: "OAuth2",
            user: "jay4node@gmail.com",
            clientId: client_id,
            clientSecret: client_secret,
            refreshToken: refresh_token,
            accessToken: accessToken
        }
    });
    const mailOptions = {
        to: emailReceiver,
        from: 'Group 3 Freelancer',
        subject: 'Reset Password',
        html: '<div style="background-color:white;color:black;">'+
        '<p style="font-weight: bold;">You requested to resest your password. Click on the link below to reset your password.<p>'+
        '<a href="http://'+hostname+'/reset-password/'+token+'/'+emailReceiver+'">Click here to reset password</a></div>',
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

hashPassword = (password) =>{
    return crypto.createHmac('sha256', secret)
        .update(password)
        .digest('hex');
};