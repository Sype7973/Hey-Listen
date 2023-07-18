import { gql } from '@apollo/client';

// add user
export const ADD_USER = gql`
    mutation addUser(username: String!, email: String!, password: String!, userType: String!, musicLinks: String, bio: String, profilePicture: String) {
        addUser(username: $username, email: $email, password: $password, userType: $userType, musicLinks: $musicLinks, bio: $bio, profilePicture: $profilePicture){
            token
            user {
                _id
                username
                email
                userType
                musicLinks
                bio
                profilePicture
            }
        }
    }
`;
//  login user
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

//  Update user
export const UPDATE_USER = gql`
    mutation updateUser(username: String, email: String, password: String, musicLinks: String, bio: String, profilePicture: String) {
        updateUser(username: $username, email: $email, password: $password musicLinks: $musicLinks, bio: $bio, profilePicture: $profilePicture){
            _id
            username
            email
            userType
            musicLinks
            bio
            profilePicture
        }
    }
`;
// add post
export const ADD_POST = gql`
    mutation addPost($postTitle: String!, $postDescription: String!, $postText: String!, $postAuthor: String!, $postPrice: String!) {
        addPost(postTitle: $postTitle, postDescription: $postDescription, postText: $postText, postAuthor: $postAuthor, postPrice: $postPrice){
            _id
            postTitle
            postDescription
            postType
            username
            budget
            deadline
            createdAt
        }
    }
`;
// update Post
export const UPDATE_POST = gql`
    mutation updatePost($postTitle: String, $postDescription: String, $postText: String, $postAuthor: String, $postPrice: String) {
        updatePost(postTitle: $postTitle, postDescription: $postDescription, postText: $postText, postAuthor: $postAuthor, postPrice: $postPrice){
            _id
            postTitle
            postDescription
            postType
            username
            budget
            deadline
            createdAt
        }
    }
`;
// remove post
export const REMOVE_POST = gql`
    mutation removePost($postId: ID!) {
        removePost(postId: $postId){
            _id
            postTitle
            postDescription
            postType
            username
            budget
            deadline
            createdAt
        }
    }
`;
//  add commission
export const ADD_COMMISSION = gql`
    mutation addCommission($commissionTitle: String!, $commissionDescription: String!, $commissionType: String!, $commissionAuthor: String!, $commissionPrice: String!) {
        addCommission(commissionTitle: $commissionTitle, commissionDescription: $commissionDescription, commissionType: $commissionType, commissionAuthor: $commissionAuthor, commissionPrice: $commissionPrice){
            _id
            commissionTitle
            commissionDescription
            commissionType
            username
            budget
            completionDate
            status
            rating
            review
        }
    }
`;
//  update commission
export const UPDATE_COMMISSION = gql`
    mutation updateCommission($commissionTitle: String, $commissionDescription: String, $commissionType: String, $commissionAuthor: String, $commissionPrice: String) {
        updateCommission(commissionTitle: $commissionTitle, commissionDescription: $commissionDescription, commissionType: $commissionType, commissionAuthor: $commissionAuthor, commissionPrice: $commissionPrice){
            _id
            commissionTitle
            commissionDescription
            commissionType
            username
            budget
            completionDate
            status
            rating
            review
        }
    }
`;

