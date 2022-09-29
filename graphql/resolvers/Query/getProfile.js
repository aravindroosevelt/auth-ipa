const { authenticate } = require("../../../helpers/authenticate");
const User = require("../../../models/User");

const getProfile = async (parent, args, { req }) => {
    try {
        let isAuthenticated = await authenticate(req);
        if (!isAuthenticated) throw new Error("unAuthorized");
        let user = await User.findOne({
            where: { email: isAuthenticated },
            attributes: ["username", "email", "gender", "phone", "profile"],
        });
        return {
            success: true,
            message: "fetched succesfully!",
            user,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

module.exports = getProfile;
