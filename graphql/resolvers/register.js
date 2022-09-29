const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

const register = async (parent, args, { req, res }) => {
    try {
        let { username, email, password, phone, gender } = args;
        password = await bcrypt.hash(password, 10);
        await User.create({
            username,
            email,
            password,
            phone,
            gender,
        });
        const token = jwt.sign(
            {
                username,
                email,
            },
            process.env.JWT_KEY,
            { expiresIn: 60 * 60 }
        );
        res.cookie("token", token);
        return {
            success: true,
            message: "User created!",
            user: {
                username,
                profile: `${process.env.SERVER_URL}/user.svg`,
            },
        };
    } catch (error) {
        return {
            success: false,
            message: "email and phone number should be unique!",
        };
    }
};

module.exports = register;
