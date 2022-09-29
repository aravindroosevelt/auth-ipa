let axios = require("axios");

const validToken = async (parent, args, context) => {
    try {
        let { data } = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${args.token}`
        );
        if (!data.success) throw new Error("timeout");
        return {
            success: data.success,
            message: "valid",
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

module.exports = {
    validToken,
};
