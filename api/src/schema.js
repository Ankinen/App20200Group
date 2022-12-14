// Tehdään GraphQL (schema) määrittelyt ja resolverit for api
const { gql } = require('apollo-server-express');

module.exports = gql`
scalar DateTime
type List {
    id: ID!
    listName: String!
    creator: User!
    listFamily: Family!
    disabled: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
}

type User {
    id: ID!
    username: String!
    email: String
    lists: [List]
    families: [Family]
}

type Item {
    id: ID!
    itemName: String!
    quantity: String
    list: List!
}

type Family {
    id: ID!
    familyName: String!
    familyMember: [User!]!
    lists: [List]
}

type ListFeed {
    lists: [List]!
    cursor: String!
    hasNextPage: Boolean!
}

type FamilyFeed {
    families: [Family]!
    cursor: String!
    hasNextPage: Boolean!
}

type Query {
    lists: [List!]!
    allLists: [List!]!
    list(id: ID): List!
    user(username: String!): User
    users: [User!]!
    me: User!
    family(familyName: String): Family
    families: [Family!]!
    item(id: ID): Item!
    items: [Item!]!
    listFeed(cursor: String): ListFeed
    familyFeed(cursor: String): FamilyFeed
}

type Mutation {
    newList(listName: String!): List!
    deleteList(id: ID!): Boolean!
    updateList(id: ID!, listName: String!): List!
    deactivateList(id: ID!): List!
    activateList(id: ID!): List!
    newFamily(familyName: String!): Family!
    deleteFamily(id: ID!): Boolean!
    updateFamily(id: ID!, familyName: String!): Family!
    signUp(username: String!, email: String!, password: String!): String!
    logIn(username: String!, email: String!, password: String!): String!
    newItem(itemName: String!, quantity: String!): String!
    deactivateItem(id: ID): Item!
    activateItem(id: ID): Item!
    
}
`;