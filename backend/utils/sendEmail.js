const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            connectionTimeout: 10000, // 10 sec
            greetingTimeout: 10000,
            socketTimeout: 10000
        });
        transporter.verify((error, success) => {
            if (error) {
                console.error("SMTP VERIFY ERROR:", error);
            } else {
                console.log("SMTP READY");
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;