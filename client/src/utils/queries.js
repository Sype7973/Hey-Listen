import {gql} from '@apollo/client';

export const GET_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            commissions {
                _id
                commissionName
                description
                price
                image
                link
                createdAt
            }
        }
    }
`;

export const QUERY_COMMISSIONS = gql`
    query getCommissions($username: String) {
        commissions(username: $username) {
            _id
            commissionName
            description
            price
            image
            link
            createdAt
        }
    }
`;

export const QUERY_COMMISSION = gql`
    query getCommission($id: ID!) {
        commission(_id: $id) {
            _id
            commissionName
            description
            price
            image
            link
            createdAt
        }
    }
`;
