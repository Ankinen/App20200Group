//API Query code:

const { models } = require("mongoose");

module.exports = {
    notes: async (parent, args, { models }) => await models.Note.find({disabled: false}).limit(100),
    allNotes: async (parent, args, { models }) => await models.Note.find().limit(100),
    note: async (parent, args, { models }) => await models.Note.findById(args.id),
    user: async (parent, { username }, { models }) => await models.User.findOne({ username }),
    users: async (parent, args, { models }) => await models.User.find({}),
    me: async (parent, args, {models, user}) => await models.User.findById(user.id),
    noteFeed: async (parent, { cursor }, { models }) => {
        // limit is set to 10
        const limit = 4;
        let hasNextPage = false;
        let cursorQuery = {};

        // if cursor exists, query looks for notes with smaller ObjectId than the cursor
        if (cursor) {
            cursorQuery = {_id: { $lt: cursor } };
        }

        // find the limit +1, sort newest to oldest
        let notes = await models.Note.find(cursorQuery).sort({ _id: -1 }).limit(limit + 1);
        // if more notes than limit, set hadNextPage to true
        if (notes.length > limit) {
            hasNextPage = true;
            notes = notes.slice(0, -1);
        }

        // the new cursor is set to the last item in the feed array
        const newCursor = notes[notes.length - 1]._id;

        return {
            notes,
            cursor: newCursor,
            hasNextPage
        };
    }
}