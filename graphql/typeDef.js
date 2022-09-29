const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type Query {
        getProfile: Response
    }
    type Mutation {
        register(
            username: String!
            email: String!
            password: String!
            gender: String!
            phone: String!
        ): Response
        login(email: String!, password: String!, rememberMe: Boolean): Response
        validToken(token: String!): Response
        logout: Response
        forgotPassword(email: String!, password: String!): Response
        registerWithGoogle(
            email: String!
            username: String!
            profile: String!
            id: String!
        ): Response
    }
    type Response {
        success: Boolean
        message: String
        user: User
    }
    type User {
        username: String
        email: String
        phone: String
        gender: String
        profile: String
    }
`;

module.exports = {
    typeDefs,
};
