const { User, Book } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
// const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query : {
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError("Please Login!");
        }
    },
    Mutation: {
        login: async (parent, { email, password }) => {
            const user = await User.findOne ({ email });
      
            if (!user) {
              throw new AuthenticationError("Incorrect email or password");
            }
            const correctPass = await user.isCorrectPassword(password);
      
            if (!correctPass) {
              throw new AuthenticationError("Incorrect email or password");
            }
      
            const token = signToken(user);
            return { token, user }
          },
        createUser: async (parent, args) => {
            const user = await User.create(args);
            return user;
        },
        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate({ _id: context.user._id }, { $addToSet: { savedBooks: book }}, { new: true, runValidators: true });
            }
            throw new AuthenticationError("Please Login!");
        },
        removeBook: async (parent, { book }, context) => {
            if (context.user) {
                return User.findOneAndUpdate( {_id: context.user._id }, { $pull: {savedBooks: book }}, { new: true });
            }
            throw new AuthenticationError("Please Login!")
        }
    }
};

module.exports = resolvers;