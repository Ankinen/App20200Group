module.exports = {
    // resolve the author info for a note when requested
    author: async (note, args, { models }) => await models.User.findById(note.author),
    // resolves the favoriteBy info for a note when requested
    favoritedBy: async (note, args, { models }) => await models.User.find({_id: {$in: note.favoritedBy}}),
};