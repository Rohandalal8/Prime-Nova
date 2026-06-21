const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        console.log("HOST:", process.env.EMAIL_HOST);
        console.log("PORT:", process.env.EMAIL_PORT);
        console.log("USER:", process.env.EMAIL_USER);
        console.log("PASS:", process.env.EMAIL_PASS);
        console.log("FROM:", process.env.EMAIL);

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text
        };
        console.log("Sending email to:", to);
        console.log("Email subject:", subject);
        console.log("Email text:", text);
        console.log("Mail options:", mailOptions);
        console.log("sending email...");
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;