const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            family: 4
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