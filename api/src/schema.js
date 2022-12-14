// Tehdään GraphQL (schema) määrittelyt ja resolverit for api
const { gql } = require('apollo-server-express');

module.exports = gql`
scalar DateTime
type Note {
    id: ID!
    content: String!
    author: User!
    disabled: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
    favoriteCount: Int!
    favoritedBy: [User]
}

type User {
    id: ID!
    username: String!
    email: String
    avatar: String!
    notes: [Note!]!
    favorites: [Note!]!
}

type NoteFeed {
    notes: [Note]!
    cursor: String!
    hasNextPage: Boolean!
}

type Query {
    notes: [Note!]!
    allNotes: [Note!]!
    note(id: ID): Note!
    user(username: String!): User
    users: [User!]!
    me: User!
    noteFeed(cursor: String): NoteFeed
}

type Mutation {
    newNote(content: String!): Note!
    deleteNote(id: ID!): Boolean!
    updateNote(id: ID!, content: String!): Note!
    signUp(username: String!, email: String!, password: String!): String!
    signIn(username: String!, email: String!, password: String!): String!
    toggleFavorite(id: ID!): Note!
    deactivateNote(id: ID!): Note!
    activateNote(id: ID!): Note!
}
`;