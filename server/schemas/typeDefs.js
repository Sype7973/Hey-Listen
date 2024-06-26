const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    commissionIds: [ID]
    password: String
    userType: String
    bio: String
    profilePicture: String
    musicLinks: [String]
    posts: [Post]
    conversations: [ConversationEntry]

  }

  type ConversationEntry {
    conversationId: ID
    otherUsername: String
    otherUserId: ID
  }

  input MessageInput {
    content: String!
    sender: ID!
  }
  type Message {
    content: String!
    sender: User!
    timestamp: String!
  }
  type Conversation {
    id: ID!
    participants: [User!]!
    messages: [Message!]!
  }
  type Commission {
    _id: ID
    commissionTitle: String
    commissionType: String
    commissionDescription: String
    creatorUsername: String
    collaboratorUsername: String
    collaboratorId: String
    creatorId: String
    budget: Int
    deadline: String
    completionDate: String
    status: Boolean
    rating: Int
    review: String
    createdAt: String
  }

  input CommissionInput {
    _id: ID
    commissionTitle: String
    commissionType: String
    commissionDescription: String
    username: String
    creatorUsername: String
    collaboratorUsername: String
    collaboratorId: String
    creatorId: String
    budget: Int
    deadline: String
    completionDate: String
    status: Boolean
    rating: Int
    review: String
    createdAt: String
  }

  type Post {
    _id: ID
    postTitle: String
    postDescription: String
    postType: String
    username: String
    budget: Int
    deadline: String
    userId: ID
    createdAt: String
    email: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getPosts: [Post]
    getUsers: [User]
    getUser(_id: ID!): User
    getPost(_id: ID!): Post
    getCommission(_id: ID!): Commission
    getCommissions: [Commission]
    getProfile(username: String!): User
    filterPost(postType: String!): [Post]
    messages: [Message!]
    message(id: ID!): Message
    conversations: [Conversation!]
    conversation(id: ID!): Conversation
    getConversation(participants: [ID!]!): Conversation
  }

  type Mutation {
    addUser(
      username: String!
      email: String!
      password: String!
      userType: String!
      musicLinks: [String]
      bio: String
      profilePicture: String
    ): Auth
    
    login(email: String!, password: String!): Auth

    updateUser(
      _id: ID
      username: String
      email: String
      commissionIds: [ID]
      password: String
      userType: String
      bio: String
      profilePicture: String
      musicLinks: [String]
    ): User

    addPost(
      postTitle: String!
      postDescription: String!
      postType: String!
      userId: ID!
      budget: Int
      deadline: String!
      email: String!
    ): Post
    updatePost(
      postId: ID!
      postTitle: String
      postDescription: String
      postType: String
      username: String
      budget: Int
      deadline: String
    ): Post
    removePost(postId: ID!): Post
    deleteUser(_id: ID!): User
    updateCommission(commission: CommissionInput): Commission
    addCommission(commissions: CommissionInput): User
    getCommission(_id: ID!): Commission
    acceptPost(commissions: CommissionInput): Commission
    createCommission(commissionInput: CommissionInput): Commission
    deleteCommission(_id: ID!): Commission

    createMessage(content: String!, sender: ID!, receiver: ID!): Conversation
    updateMessage(id: ID!, content: String!): Message
    deleteMessage(id: ID!): Boolean

    createConversation(participants: [ID!]!): Conversation
  }
`;

module.exports = typeDefs;
