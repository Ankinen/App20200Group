module.exports = {
    // resolve the creator info for a list when requested
    creator: async (list, args, { models }) => await models.User.findById(list.creator),
    // resolves the listFamily info for a list when requested
    listFamily: async (list, args, { models }) => await models.Family.findbyId(list.listFamily),
};