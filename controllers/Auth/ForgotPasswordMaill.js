const nodeMailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const client_id = "496893632690-o7p2enqal4fr7g3ekka1u23lnr8df1t4.apps.googleusercontent.com";
const client_secret= "S3nb85ZLDXhEZyyqW4EA-_54";
const refresh_token = "1//04NFUbHs-0avoCgYIARAAGAQSNwF-L9IrwLPoaTqq2HpuJCw4bWwmxWXWBbEVDwUtSGr_gOzV10H2YX29G-ZozwQ2fuCqxoRFPsQ";

const oauth2Client = new OAuth2(
    client_id, // ClientID
    client_secret, // Client Secret
    "https://developers.google.com/oauthplayground" // Redirect URL
);

oauth2Client.setCredentials({
    refresh_token: refresh_token
});
const accessToken = oauth2Client.getAccessToken();

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
        text: `Click on the link below to reset your password.\n\n
                http://`+hostname+`/reset-password/${token}/${emailReceiver}`
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