var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
    },
});

var mailOptions = {
    from: process.env.EMAIL,
    subject: "Reset-password",
};

const sendEmail = (email, msg) => {
    mailOptions.to = email;
    mailOptions.html = `<center><h6>Click here to reset your password</h6><a href=${msg}>Reset</a></center>`;
    try {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    sendEmail,
};
