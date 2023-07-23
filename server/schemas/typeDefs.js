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
  }

  type Commission {
    _id: ID
    commissionTitle: String
    commissionType: String
    commissionDescription: String
    username: String
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
      username: String
      email: String
      password: String
      musicLinks: [String]
      bio: String
      profilePicture: String
    ): User
    addPost(
      postTitle: String!
      postDescription: String!
      postType: String!
      userId: ID!
      budget: Int
      deadline: String!
    ): Post
    updatePost(
      postTitle: String
      postDescription: String
      postType: String
      username: String
      budget: Int
      deadline: String
      createdAt: String
    ): Post
    removePost(postId: ID!): Post
    deleteUser: User
    updateCommission(commissions: [CommissionInput]): User
    addCommission(commissions: CommissionInput): User
    getCommission(_id: ID!): Commission
    acceptPost(commissions: CommissionInput): Commission
    createCommission(commissionInput: CommissionInput): Commission

  }
`;

module.exports = typeDefs;
