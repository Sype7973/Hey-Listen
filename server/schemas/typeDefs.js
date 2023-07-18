const { gql } = require('apollo-server-express');

// addcommission, updatecommission, removecommission can be added later if needed for front end

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
        getPosts(username: String): [Post]
        getUsers: [User]
        getUser(_id: ID!): User
        getPost(_id: ID!): Post

    }
    


    type Mutation {
        addUser(username: String!, email: String!, password: String!, userType: String!): Auth
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        addPost(postTitle: String!, postDescription: String!, postType: String!, userId: ID!, budget: Int, deadline: String!): Post
        updatePost(postTitle: String, postDescription: String, postType: String, username: String, budget: Int, deadline: String): Post
        removePost(postId: ID!): User
        deleteUser: User 

    }
`;

module.exports = typeDefs;