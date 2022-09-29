const logout = (parent, args, { req, res }) => {
    try {
        res.clearCookie("token");
        return {
            success: true,
            message: "logout success!",
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

module.exports = {
    logout,
};
