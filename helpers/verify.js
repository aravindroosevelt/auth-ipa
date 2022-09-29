const jwt = require("jsonwebtoken");

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_KEY);
    } catch (error) {
        return false;
    }
};

module.exports = {
    verifyToken,
};
