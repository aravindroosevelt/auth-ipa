const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../../helpers/sendEmail");

const forgotPassword = async (parent, args, { req, res }) => {
    try {
        let user = await User.findOne({
            where: { email: args.email },
            raw: true,
        });
        if (!user) throw new Error("Email not found!");
        let token = await jwt.sign(
            { email: args.email, password: args.password },
            process.env.JWT_KEY,
            { expiresIn: 60 * 5 }
        );
        //send verification link
        sendEmail(
            "roosevelt6066@gmail.com",
            `${process.env.SERVER_URL}/reset?token=${token}`
        );
        return {
            success: true,
            message: "Reset password activation link sent to your email!",
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

module.exports = {
    forgotPassword,
};
