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
        price: String
        image: String
        link: String
        createdAt: String
        username: String
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
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        addCommission(commissionName: String!, description: String!, price: String!, image: String!, link: String!): Commission
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        updateCommission(commissionName: String, description: String, price: String, image: String, link: String): Commission
        removeCommission(commissionId: ID!): User
    }
`;

module.exports = typeDefs;