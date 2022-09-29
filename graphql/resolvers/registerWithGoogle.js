const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const registerWithGoogle = async (parent, args, { req, res }) => {
    try {
        let user = await User.findOne({
            where: { email: args.email },
            raw: true,
        });
        if (!user) {
            let password = await bcrypt.hash(
                `${args.username}ZA${args.id}`,
                10
            );
            await User.create({
                username: args.username,
                email: args.email,
                password,
                profile: args.profile,
            });
        }
        const token = jwt.sign(
            {
                username: args.username,
                email: args.email,
            },
            process.env.JWT_KEY,
            { expiresIn: 60 * 60 }
        );
        res.cookie("token", token);
        return {
            success: true,
            message: "User created!",
            user: {
                username: args.username,
                profile: args.profile,
            },
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

module.exports = {
    registerWithGoogle,
};
