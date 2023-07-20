const { gql } = require('apollo-server-express');


const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        commissions: [Commission]
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
        collaborator: String
        budget: Int
        completionDate: String
        status: String
        rating: Int
        review: String
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
    }
    


    type Mutation {
        addUser(username: String!, email: String!, password: String!, userType: String!, musicLinks: [String], bio: String, profilePicture: String): Auth
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String, musicLinks: [String], bio: String, profilePicture: String): User
        addPost(postTitle: String!, postDescription: String!, postType: String!, username: String!, budget: Int, deadline: String!, createdAt: String!): Post
        updatePost(postTitle: String, postDescription: String, postType: String, username: String, budget: Int, deadline: String, createdAt: String): Post
        removePost(postId: ID!): User
        deleteUser: User 
        updateCommission(commissionTitle: String, commissionType: String, commissionDescription: String, username: String, budget: Int, completionDate: String, status: String, rating: Int, review: String): Commission
        addCommission(commissionTitle: String!, commissionType: String!, commissionDescription: String!, username: String!, collaborator: String!, budget: Int, completionDate: String!): Commission
        getCommission(_id: ID!): Commission
    }
`;

module.exports = typeDefs;