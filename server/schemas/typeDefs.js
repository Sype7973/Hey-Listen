const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        commissions: [Commission]
    }

    type Commission {
        _id: ID
        commissionName: String
        description: String
        budget: String
        image: String
        link: String
        createdAt: String
        username: String
        status: String
        review: String
        rating: Int
    }

    Type Post {
        _id: ID
        postTitle: String
        postDescription: String
        postText: String
        postAuthor: String
        postPrice: String
        createdAt: String
    }


    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        commissions(username: String): [Commission]
        commission(_id: ID!): Commission
        users: [User]
        user(username: String!): User
        getPosts(username: String): [Post]
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addCommission(commissionName: String!, description: String!, price: String!, image: String!, link: String!): Commission
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        updateCommission(commissionName: String, description: String, price: String, image: String, link: String): Commission
        removeCommission(commissionId: ID!): User
        addPost(postTitle: String!, postDescription: String!, postText: String!, postAuthor: String!, postPrice: String!): Post
        updatePost(postTitle: String, postDescription: String, postText: String, postAuthor: String, postPrice: String): Post
    }
`;

module.exports = typeDefs;