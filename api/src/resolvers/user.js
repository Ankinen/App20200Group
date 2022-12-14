module.exports = {
    lists: async (user, args, { models }) => { 
        return await models.List.find({ creator: user._id}).sort({ _id: -1 });
    },
    families: async (user, args, { models }) => {
        return await models.Family.find({ familyMember: user._id}).sort({ _id: -1 });
    }
};