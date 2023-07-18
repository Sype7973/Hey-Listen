import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password){
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password){
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_COMMISSION = gql`
    mutation addCommission($commissionName: String!, $description: String!, $price: String!, $image: String!, $link: String!) {
        addCommission(commissionName: $commissionName, description: $description, price: $price, image: $image, link: $link){
            _id
            commissionName
            description
            price
            image
            link
            createdAt
            username
        }
    }
`;

export const UPDATE_USER = gql`
    mutation updateUser($username: String, $email: String, $password: String) {
        updateUser(username: $username, email: $email, password: $password){
            _id
            username
            email
        }
    }
`;

export const UPDATE_COMMISSION = gql`
    mutation updateCommission($commissionName: String, $description: String, $price: String, $image: String, $link: String) {
        updateCommission(commissionName: $commissionName, description: $description, price: $price, image: $image, link: $link){
            _id
            commissionName
            description
            price
            image
            link
            createdAt
            username
        }
    }
`;

export const REMOVE_COMMISSION = gql`
    mutation removeCommission($commissionId: ID!) {
        removeCommission(commissionId: $commissionId){
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

export const ADD_POST = gql`
    mutation addPost($postTitle: String!, $postDescription: String!, $postText: String!, $postAuthor: String!, $postPrice: String!) {
        addPost(postTitle: $postTitle, postDescription: $postDescription, postText: $postText, postAuthor: $postAuthor, postPrice: $postPrice){
            _id
            postTitle
            postDescription
            postText
            postAuthor
            postPrice
            createdAt
        }
    }
`;

export const UPDATE_POST = gql`
    mutation updatePost($postTitle: String, $postDescription: String, $postText: String, $postAuthor: String, $postPrice: String) {
        updatePost(postTitle: $postTitle, postDescription: $postDescription, postText: $postText, postAuthor: $postAuthor, postPrice: $postPrice){
            _id
            postTitle
            postDescription
            postText
            postAuthor
            postPrice
            createdAt
        }
    }
`;

export const REMOVE_POST = gql`
    mutation removePost($postId: ID!) {
        removePost(postId: $postId){
            _id
            postTitle
            postDescription
            postText
            postAuthor
            postPrice
            createdAt
        }
    }
`;

