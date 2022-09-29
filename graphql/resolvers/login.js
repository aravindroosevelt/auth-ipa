const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const login = async (parent, args, { req, res }) => {
    try {
        const { email, password, rememberMe } = args;
        let multiHours = rememberMe ? 24 : 1;
        let user = await User.findOne({
            where: { email },
            raw: true,
            attibutes: ["username", "email", "password", "profile"],
        });
        if (!user) throw new Error("User not found!");
        const isRightPassword = await bcrypt.compare(password, user.password);
        if (!isRightPassword) throw new Error("Password mismatch!");
        const token = jwt.sign(
            {
                username: user.username,
                email,
                profile: user.profile,
            },
            process.env.JWT_KEY,
            { expiresIn: 60 * 60 * multiHours }
        );
        res.cookie("token", token);
        return {
            success: true,
            message: "sucess!",
            user: {
                username: user.username,
                profile: `${process.env.SERVER_URL}/${user.profile}`,
            },
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

module.exports = login;
