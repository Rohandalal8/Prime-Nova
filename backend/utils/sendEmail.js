const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {

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
        transporter.verify((error, success) => {
            if (error) {
                console.error("VERIFY ERROR:", error);
            } else {
                console.log("SMTP READY");
            }
        });
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;