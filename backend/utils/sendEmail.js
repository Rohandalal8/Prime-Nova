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
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 10000,
            debug: true,
            logger: true

        });
        const mailOptions = {
            from: process.env.EMAIL,
            to,
            subject,
            text
        };
        console.log("Mail options:", mailOptions);
        console.log("sending email...");
        transporter.verify((error, success) => {
            if (error) {
                console.error("VERIFY ERROR:", error);
            } else {
                console.log("SMTP READY");
            }
        });
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;