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
        musicLinks: String
        posts: [Post]
    }

    Type Post {
        _id: ID
        postTitle: String
        postDescription: String
        postType: String
        username: String
        budget: String
        deadline: String
        userId: [User]
        createdAt: String
    }


    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User      
        getPosts(username: String): [Post]
        getCommissions(username: String): [Commission]
        getCommission(_id: ID!): Commission
        getUsers: [User]
        getUser(_id: ID!): User
        getPost(_id: ID!): Post

    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!, userType: String!): Auth
        addCommission(commissionName: String!, description: String!, price: String!, image: String!, link: String!): Commission
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        updateCommission(commissionName: String, description: String, price: String, image: String, link: String): Commission
        removeCommission(commissionId: ID!): User
        addPost(postTitle: String!, postDescription: String!, postText: String!, postAuthor: String!, postPrice: String!): Post
        updatePost(postTitle: String, postDescription: String, postText: String, postAuthor: String, postPrice: String): Post
        removePost(postId: ID!): User
        deleteUser: User 
    }
`;

module.exports = typeDefs;