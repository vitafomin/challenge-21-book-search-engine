const { User, Book } = require("../models");

const resolvers = {
    Query : {
        user: async (parent, { _id }) => {
            const params = _id ? { _id } : {};
            return User.find(params);
        },
        books: async () => {
            return Book.find({});
        },
    },
    mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        updateUser: async (parent, { id, savedBooks }) => {
            return await User.findOneAndUpdate({ _id: id }, { savedBooks }, { new: true });
        }
            
    }
};

module.exports = resolvers;