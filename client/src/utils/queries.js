import { gql } from "@apollo/client";

// get your userprofile
export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      profilePicture
      userType
      commissionIds
      musicLinks
      bio
      password
      posts {
        username
        userId
        postType
        postTitle
        postDescription
        deadline
        createdAt
        budget
        _id
      }
    }
  }
`;

// get all users
export const GET_USERS = gql`
  query getUsers {
    getUsers {
      _id
      username
      email
      posts {
        _id
        postTitle
        postDescription
        postType
        username
        budget
        deadline
      }
      commissionIds
    }
  }
`;
// get a single user by username
export const GET_USER = gql`
  query SingleUser($id: ID!) {
    getUser(_id: $id) {
      _id
      bio
      commissionIds
      email
      musicLinks
      password
      posts {
        _id
        budget
        createdAt
        deadline
        postDescription
        postTitle
        postType
        username
      }
      profilePicture
      userType
      username
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
      email
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

export const GET_COMMISSIONS = gql`
  query GetCommissions {
    getCommissions {
      creatorUsername
      collaboratorUsername
      deadline
      creatorId
      createdAt
      completionDate
      commissionType
      commissionTitle
      commissionDescription
      collaboratorId
      budget
      _id
      status
    }
  }
`;

export const GET_PROFILE = gql`
  query Query($username: String!) {
    getProfile(username: $username) {
      username
      userType
      profilePicture
      password
      musicLinks
      email
      commissionIds
      bio
      _id
    }
  }
`;
