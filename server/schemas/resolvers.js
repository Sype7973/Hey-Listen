const { User, Post, Commission, Conversation } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

const resolvers = {
  Query: {
    /*------------User------------*/

    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v")
          .populate("posts");
        // console.log("User Data");
        // console.log(userData);
        return userData;
      }
      return null;
    },
    getUsers: async (parent, args, context) => {
      return User.find().select("-__v").populate("posts");
    },
    getUser: async (parent, args, context) => {
      return User.findOne({ _id: args._id })
        .select("-__v -password")
        .populate("commissions posts");
    },
    getProfile: async (parent, args, context) => {
      console.log("GETTTING THE PROFILEEEEE");
      console.log(args);
      return User.findOne({ username: args.username })
        .select("-__v")
        .populate("commissions posts");
    },

    /*------------Post------------*/

    getPosts: async () => {
      return Post.find();
    },
    getPost: async (parent, args) => {
      return Post.findOne({ _id: args._id });
    },

    getCommissions: async () => {
      return Commission.find().select("-__v");
    },
    filterPost: async (parent, args) => {
      return Post.find({ postType: args.postType });
    },

          /*------------Conversation------------*/
    getConversation: async(parent, args) => {
      console.log(args)

      const conversation = await Conversation.findOne({
        participants: { $all: [args.sender, args.receiver] },
      });
      return conversation;
    
    }
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
      const { ...updateData } = args;
      console.log("Update Data, ", updateData);
      if (updateData.password) {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(
          updateData.password,
          saltRounds
        );
        updateData.password = hashedPassword;
      }
      console.log("Update Data password ", updateData.password);

      if (context.user) {
        try {
          const user = await User.findByIdAndUpdate(
            { _id: updateData._id },
            { $set: { ...updateData } },
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
      console.log(args);
      if (context.user) {
        try {
          const user = await User.findByIdAndDelete({
            _id: args._id,
          });

          await Post.deleteMany({
            username: args.username,
          });

          await Commission.deleteMany({
            $and: [{ creatorUsername: args.username }, { status: true }],
          });
          console.log("USERERERERRER");
          console.log(user);
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
          const post = await Post.create({
            ...args,
            username: context.user.username,
            email: context.user.email,
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
            { _id: args.postId },
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

    acceptPost: async (parent, args, context) => {
      console.log(args.commissions);
      console.log(args.commissions.creatorId);
      console.log(args.commissions.collaboratorId);

      if (context.user) {
        try {
          // Create the new commission using args directly
          const newCommission = await Commission.create(args.commissions);

          // Update the relevant users with the new commission ID
          const updateCreator = await User.findByIdAndUpdate(
            args.commissions.creatorId,
            { $push: { commissionIds: newCommission._id } },
            { new: true }
          );

          const updateCollaborator = await User.findByIdAndUpdate(
            args.commissions.collaboratorId,
            { $push: { commissionIds: newCommission._id } },
            { new: true }
          );

          return updateCollaborator;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },

    removePost: async (parent, args, context) => {
      if (context.user) {
        try {
          const post = await Post.findByIdAndDelete(args.postId); // Use args.postId instead of args._id
          return post;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },

    /*------------Commission------------*/
    getCommission: async (parent, args, context) => {
      if (context.user) {
        try {
          const user = await User.findOne({ _id: args._id })
            .select("-__v -password")
            .populate("commissions");
          return user;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },

    addCommission: async (parent, args, context) => {
      if (context.user) {
        const creator = true;
        try {
          const creator = await User.findByIdAndUpdate(
            { _id: args.commissions.creatorId },
            { $push: { commissions: [args.commissions] } },
            { new: true }
          );

          const collaborator = await User.findByIdAndUpdate(
            { _id: args.commissions.collaboratorId },
            { $push: { commissions: [args.commissions] } },
            { new: true }
          );

          return creator;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },

    updateCommission: async (parent, args, context) => {
      console.log(args);
      console.log(args.commission._id);

      if (context.user) {
        try {
          const commissionData = await Commission.findByIdAndUpdate(
            { _id: args.commission._id },
            { $set: { ...args.commission } },
            { new: true }
          );
          return commissionData;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },
    deleteCommission: async (parent, args, context) => {
      console.log(args);
      if (context.user) {
        try {
          const commissionData = await Commission.findByIdAndDelete({
            _id: args._id,
          });
          return commissionData;
        } catch (err) {
          console.log(err);
          throw new Error(err);
        }
      }
    },

    /*------------Conversation------------*/
    createMessage: async (parent, args) => {
      const { content, sender, receiver } = args;
      const newMessage = {
        content,
        sender,
        timestamp: new Date(),
      };

      let conversation = await Conversation.findOne({
        participants: { $all: [sender, receiver] },
      });

      if (!conversation) {
        conversation = new Conversation({
          participants: [sender, receiver],
          messages: [],
        });
      }
      conversation.messages.push(newMessage);

      await conversation.save();

      return newMessage;
    },
  },
};

module.exports = resolvers;
