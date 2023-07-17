const { User, Commission } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user.data._id })
                .select("-__v -password")
                .populate("commissions", "activeCommissions");
                return userData;
            }
            throw new AuthenticationError("You need to be logged in!");
        },
        getCommisions: async () => {
            return Commission.find()
        },
        getCommission: async (parent, args) => {
            return Commission.findOne({ _id: args._id })
        },
        getUsers: async () => {
            return User.find()
            .select("-__v -password")
            .populate("commissions", "activeCommissions");
        },
        getUser: async (parent, args) => {
            return User.findOne({ _id: args._id })
            .select("-__v -password")
            .populate("commissions", "activeCommissions");
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        addCommission: async (parent, args, context) => {
            if (context.user) {
                try{
                const commission = await Commission.create({ ...args, username: context.user.username });

                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { commissions: commission._id } },
                    { new: true }
                );
                return commission;

                } catch (err) {
                    console.log(err);
                    throw new Error(err);
                }
            }
        },
        login: async (parent, args) => {
            const user = await User.findOne({ email: args.email });
            if (!user) {
              throw new Error("Can't find this user");
            }
      
            const correctPw = await user.isCorrectPassword(args.password);
      
            if (!correctPw) {
              throw new Error("Wrong password!");
            }
            const token = signToken(user);
            return { token, user };
          },
        updateCommission: async (parent, args, context) => {
            if (context.user) {
                try { 
                const commission = await Commission.findByIdAndUpdate(
                    { _id: args._id },
                    { $set: { ...args } },
                    { new: true }
                );
                return commission;
                } catch (err) {
                    console.log(err);
                    throw new Error(err);
                }
            }
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                try {
                const user = await User.findByIdAndUpdate(
                    { _id: args._id },
                    { $set: { ...args } },
                    { new: true }
                );
                return user;
                } catch (err) {
                    console.log(err);
                    throw new Error(err);
                }
            }
        },
        removeCommission: async (parent, args, context) => {
            if (context.user) {
                try {
                const commission = await Commission.findByIdAndDelete({
                    _id: args._id,
                });
                return commission;
                } catch (err) {
                    console.log(err);
                    throw new Error(err);
                }
            }
        }
    }
};