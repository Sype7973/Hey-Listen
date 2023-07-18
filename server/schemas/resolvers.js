const { User, Post } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    /*------------User------------*/

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user.data._id })
          .select("-__v -password")
          .populate("commissions");
        return userData;
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    getUsers: async () => {
      console.log("hello");
      return User.find().select("-__v").populate("commissions posts");
    },
    getUser: async (parent, args) => {
      return User.findOne({ _id: args._id })
        .select("-__v -password")
        .populate("commissions posts");
    },

    /*------------Post------------*/

    getPosts: async () => {
      return Post.find();
    },
    getPost: async (parent, args) => {
      return Post.findOne({ _id: args._id });
    },
  },
  Mutation: {
    /*------------User------------*/

    addUser: async (parent, args) => {
      console.log(args);
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findByIdAndUpdate(
            { _id: args._id },
            { $set: { ...args }},
            { new: true }
          );
          return user;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },

    deleteUser: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findByIdAndDelete({
            _id: args._id,
          });

          await Post.deleteMany({
            username: user.username,
          });

          return user;
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

    /*------------Post------------*/

    addPost: async (parent, args, context) => {
      if (context.user) {
        try {
          console.log(args);
          const post = await Post.create({
            ...args,
            username: context.user.username,
          });

          const updateUser = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { posts: post._id } },
            { new: true }
          );
          return post;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },

    updatePost: async (parent, args, context) => {
      if (context.user) {
        try {
          const post = await Post.findByIdAndUpdate(
            { _id: args._id },
            { $set: { ...args } },
            { new: true }
          );
          return post;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },

    removePost: async (parent, args, context) => {
      if (context.user) {
        try {
          const post = await Post.findByIdAndDelete({
            _id: args._id,
          });
          return post;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },

    /*------------Commission------------*/

    addCommission: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findByIdAndUpdate(
            { _id: args._id },
            { $push: {commissions: [args.commissions]}},
            { new: true }
          );
          return user;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },
  },
};

module.exports = resolvers;
