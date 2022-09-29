const { verifyToken } = require("./verify");

const authenticate = (req) => {
    try {
        let { token } = req.cookies;
        let result = verifyToken(token);
        if (!result) return false;
        return result.email;
    } catch (error) {
        return false;
    }
};

module.exports = {
    authenticate,
};
