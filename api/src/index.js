// index.js
// This is the main entry point of our application

// Tuodaan riippuvaisuudet
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const { connections } = require('mongoose');
const jwt = require('jsonwebtoken');
// Helmet middle ware has security-minded middleware functions
// helps the application from common web vulnerabilitis
// const helmet = require('helmet');
// CORS Cross-Origin Resource Sharing
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
/*
let notes = [
    {id: '1', content: 'This is a note', author: 'Adam Scott' },
    {id: '2', content: 'This is another note', author: 'Harlow Everly' },
    {id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];
*/
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

    // 5. Luodaan uusi Apollo-serveri
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

    // 6. Asetetaan GraphQL-serveri midlewareksi (matkan varrella 
    // suoritettavaksi ohjelmapalaseksi) ja asetetaan myös GraphQL endpointin loppuosa
    server.applyMiddleware({ app, path: '/api' });

    return server;

}

startApolloServer(typeDefs, resolvers)

// 7. Aletaan kuunnella asiakkaiden pyyntöjä portista,
// joka on annettu muuttujassa port
app.listen({ port }, () =>
    console.log(
        `GraphQL Server running at http://localhost:${port}`
    )
);