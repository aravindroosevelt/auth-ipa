const login = require("./login");
const register = require("./register");
const { validToken } = require("./validToken");
const { logout } = require("./logout");
const { forgotPassword } = require("./forgotPassword");
const { registerWithGoogle } = require("./registerWithGoogle");
const getProfile = require("./Query/getProfile");

const resolvers = {
    Query: {
        getProfile,
    },
    Mutation: {
        register,
        login,
        validToken,
        logout,
        forgotPassword,
        registerWithGoogle,
    },
};

module.exports = {
    resolvers,
};
