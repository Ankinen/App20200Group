//API Query code:

const { models } = require("mongoose");

module.exports = {
    lists: async (parent, args, { models }) => await models.List.find({disabled: false}).limit(100),
    allLists: async (parent, args, { models }) => await models.List.find().limit(100),
    list: async (parent, args, { models }) => await models.List.findById(args.id),
    items: async (parent, args, {models }) => await models.Item.find().limit(100),
    user: async (parent, { username }, { models }) => await models.User.findOne({ username }),
    users: async (parent, args, { models }) => await models.User.find({}),
    me: async (parent, args, {models, user}) => await models.User.findById(user.id),
    family: async (parent, args, { models }) => await models.Family.findOne({ familyName }),
    families: async (parent, args, { models }) => await models.Family.find({}),
    listFeed: async (parent, { cursor }, { models }) => {
        // limit is set to 10
        const limit = 4;
        let hasNextPage = false;
        let cursorQuery = {};

        // if cursor exists, query looks for lists with smaller ObjectId than the cursor
        if (cursor) {
            cursorQuery = {_id: { $lt: cursor } };
        }

        // find the limit +1, sort newest to oldest
        let lists = await models.List.find(cursorQuery).sort({ _id: -1 }).limit(limit + 1);
        // if more lists than limit, set hadNextPage to true
        if (lists.length > limit) {
            hasNextPage = true;
            lists = lists.slice(0, -1);
        }

        // the new cursor is set to the last item in the feed array
        const newCursor = lists[lists.length - 1]._id;

        return {
            lists,
            cursor: newCursor,
            hasNextPage
        };
    },
    familyFeed: async (parent, { cursor }, { models }) => {
        // limit is set to 10
        const limit = 4;
        let hasNextPage = false;
        let cursorQuery = {};

        if (cursor) {
            cursorQuery = {_id: { $lt: cursor } };
        }

        let families = await models.Family.find(cursorQuery).sort({ _id: -1 }).limit(limit + 1);

        if (families.length > limit) {
            hasNextPage = true;
            families = families.slice(0, -1);
        }

        const newCursor = families[families.length - 1]._id;

        return {
            families,
            cursor: newCursor,
            hasNextPage
        };
    }
}