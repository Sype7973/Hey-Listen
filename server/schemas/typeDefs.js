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
        getCommissions(username: String): [Commission]
        getCommission(_id: ID!): Commission
        getUsers: [User]
        getUser(_id: ID!): User
    }
    
    type Mutation {
        addUser(username: String!, email: String!, password: String!, userType: String!): Auth
        addCommission(commissionName: String!, description: String!, price: String!, image: String!, link: String!): Commission
        login(email: String!, password: String!): Auth
        updateUser(username: String, email: String, password: String): User
        updateCommission(commissionName: String, description: String, price: String, image: String, link: String): Commission
        removeCommission(commissionId: ID!): User
    }
`;

module.exports = typeDefs;