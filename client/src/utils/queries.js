import { gql } from "@apollo/client";

// get your userprofile
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            Post {
                _id
                postTitle
                postDescription
                postType
                username
                budget
                deadline
                createdAt
            }
            Commission {
                _id
                commissionTitle
                commissionType
                commissionDescription
                budget
                completionDate
                status
                rating
                review
        }
    }
`;

// get all users
export const GET_USERS = gql`
    query getUsers {
        users {
            _id
            username
            email
            Post {
                _id
                postTitle
                postDescription
                postType
                username
                budget
                deadline
                createdAt
            }
            Commission {
                _id
                commissionTitle
                commissionType
                commissionDescription
                budget
                completionDate
                status
                rating
                review
        }
    }
`;
// get a single user by username
export const GET_USER = gql`
    query getUser($username: String!) {
        user(username: $username) {
            _id
            username
            email
            Post {
                _id
                postTitle
                postDescription
                postType
                username
                budget
                deadline
                createdAt
            }
            Commission {
                _id
                commissionTitle
                commissionType
                commissionDescription
                budget
                completionDate
                status
                rating
                review
        }
    }
`;
//  get all posts
export const QUERY_POSTS = gql`
  query Posts {
    getPosts {
      _id
      budget
      createdAt
      deadline
      postDescription
      postTitle
      postType
      userId
      username
    }
  }
`;
// get a single post by id
export const QUERY_POST = gql`
  query getPost($id: ID!) {
    getPost(_id: $id) {
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
