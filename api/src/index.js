// Tuodaan riippuvaisuudet
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const { connections } = require('mongoose');
const jwt = require('jsonwebtoken');

const cors = require('cors');

// limit the query complexity
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');

const db = require('./db');
const models = require('./models/');
const typeDefs = require('./schema');    
const resolvers = require('./resolvers/');

// Alustetaan vakioita ja ympäristömuuttujia
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

// Yhdistä tietokantaan
db.connect(DB_HOST);

// Luodaan expressin app-olio
const app = express();
// otetaan helmet käyttöön
// app.use(helmet());
app.use(cors());

// verify the validity of the token:
// get the user info from a JWT
const getUser = token => {
    if (token) {
        try {
            // return the user information from the token
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
};

async function startApolloServer(typeDefs, resolvers){

    // create new Apollo server
    const server = new ApolloServer({ 
        typeDefs, 
        resolvers,
        validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
        context: ({ req }) => {
            // get the user token from the headers
            const token = req.headers.authorization;
            //try to retrieve a user with the token
            const user = getUser(token);
            // Add the db models and the user to the context
            return { models, user };
        }
    });

    await server.start();

    server.applyMiddleware({ app, path: '/api' });

    return server;

}

startApolloServer(typeDefs, resolvers)

app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}`
    )
);