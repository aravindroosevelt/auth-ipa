const { verifyToken } = require("./verify");

const authenticate = (req) => {
    try {
        let { token } = req.cookies;
        console.log("TOKEN==> " + token);
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
