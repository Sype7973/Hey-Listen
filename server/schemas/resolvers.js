const { User, Commission } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user.data._id })
                .select("-__v -password")
                .populate("savedBooks");
                return userData;
            }
            throw new AuthenticationError("You need to be logged in!");
        },