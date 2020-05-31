/*Not using this because emaill sends three tines. Fix it soon*/
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

//send email to notify user of verification status
module.exports.SendMailConfirmVerify = (emailReceiver, token)=>{
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
        subject: 'Successful Verification',
        text: `Welcome to Group 3 freelancer. Your email has successfully been verified.`
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
