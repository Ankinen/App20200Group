const Query = require('./query');
const Mutation = require('./mutation');
const { GraphQLDateTime } = require('graphql-scalars');
const List = require('./list');
const User = require('./user');
const Family = require('./family');

module.exports = {
    Query,
    Mutation,
    DateTime: GraphQLDateTime,
    List,
    User,
    Family
};