require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");

const { db } = require("./db");
const { typeDefs } = require("./graphql/typeDef");
const { resolvers } = require("./graphql/resolvers/resolvers");
const fileRoute = require("./routes/fileRoute");
const resetPassRoute = require("./routes/resetPassRoute");

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.static("assets"));

//REST routes
app.use("/upload", fileRoute);
app.use("/reset", resetPassRoute);

const startServer = async () => {
    var server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => ({
            req,
            res,
        }),
    });
    const corsOptions = {
        origin: "http://localhost:3000",
        credentials: true,
    };
    await server.start();
    server.applyMiddleware({ app, cors: corsOptions });
    app.listen(process.env.PORT || 4000, () => {
        console.log(server.graphqlPath);
    });
};

startServer();

// db.sync({ force: true }).then(() => console.log("Success!"));
db.authenticate()
    .then(() => console.log(`DB connected!`))
    .catch((err) => console.log(err));
