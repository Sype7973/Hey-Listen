import { gql } from "@apollo/client";

// add user
export const ADD_USER = gql`
  mutation AddUser(
    $username: String!
    $email: String!
    $password: String!
    $userType: String!
    $musicLinks: [String]
    $bio: String
    $profilePicture: String
  ) {
    addUser(
      username: $username
      email: $email
      password: $password
      userType: $userType
      musicLinks: $musicLinks
      bio: $bio
      profilePicture: $profilePicture
    ) {
      token
      user {
        username
        userType
        profilePicture
        posts {
          postTitle
          username
          userId
          postType
          postDescription
          deadline
          budget
          _id
        }
        password
        musicLinks
        email
        bio
        _id
      }
    }
  }
`;
//  login user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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
  mutation UpdateUser(
    $musicLinks: [String]
    $profilePicture: String
    $bio: String
    $userType: String
    $password: String
    $commissionIds: [ID]
    $email: String
    $username: String
    $id: ID
  ) {
    updateUser(
      musicLinks: $musicLinks
      profilePicture: $profilePicture
      bio: $bio
      userType: $userType
      password: $password
      commissionIds: $commissionIds
      email: $email
      username: $username
      _id: $id
    ) {
      profilePicture
      userType
      username
      password
      musicLinks
      email
      commissionIds
      bio
      _id
    }
  }
`;

//  delete user
export const DELETE_USER = gql`
  mutation Mutation($id: ID!) {
    deleteUser(_id: $id) {
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

// add post
export const ADD_POST = gql`
  mutation AddPost(
    $postTitle: String!
    $postDescription: String!
    $postType: String!
    $userId: ID!
    $deadline: String!
    $budget: Int
    $email: String!
  ) {
    addPost(
      postTitle: $postTitle
      postDescription: $postDescription
      postType: $postType
      userId: $userId
      deadline: $deadline
      budget: $budget
      email: $email
    ) {
      _id
      budget
      deadline
      createdAt
      postDescription
      postType
      postTitle
      userId
      username
    }
  }
`;

// update Post
export const UPDATE_POST = gql`
  mutation updatePost(
    $postId: ID!
    $postTitle: String
    $postDescription: String
    $postType: String
    $username: String
    $budget: Int
    $deadline: String
  ) {
    updatePost(
      postId: $postId
      postTitle: $postTitle
      postDescription: $postDescription
      postType: $postType
      username: $username
      budget: $budget
      deadline: $deadline
    ) {
      _id
      postTitle
      postDescription
      postType
      username
      budget
      deadline
    }
  }
`;

// remove post
export const REMOVE_POST = gql`
  mutation removePost($postId: ID!) {
    removePost(postId: $postId) {
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
  mutation addCommission(
    $commissionTitle: String!
    $commissionDescription: String!
    $commissionType: String!
    $commissionAuthor: String!
    $commissionPrice: String!
  ) {
    addCommission(
      commissionTitle: $commissionTitle
      commissionDescription: $commissionDescription
      commissionType: $commissionType
      commissionAuthor: $commissionAuthor
      commissionPrice: $commissionPrice
    ) {
      _id
      commissionTitle
      commissionDescription
      commissionType
      creatorUsername
      budget
      deadline
      completionDate
      status
      rating
      review
    }
  }
`;
//  update commission
export const UPDATE_COMMISSION = gql`
  mutation UpdateCommission($commission: CommissionInput) {
    updateCommission(commission: $commission) {
      creatorUsername
    }
  }
`;

//accept post
export const ACCEPT_POST = gql`
  mutation AcceptPost($commissions: CommissionInput) {
    acceptPost(commissions: $commissions) {
      creatorUsername
      deadline
      creatorId
      createdAt
      completionDate
      commissionType
      commissionTitle
      collaboratorId
      commissionDescription
      _id
      budget
    }
  }
`;

//  delete commission
export const DELETE_COMMISSION = gql`
  mutation DeleteCommission($id: ID!) {
    deleteCommission(_id: $id) {
      commissionType
      commissionTitle
      commissionDescription
      collaboratorUsername
      collaboratorId
    }
  }
`;

export const CREATE_CONVERSATION = gql`
  mutation CreateConversation($participants: [ID!]!) {
    createConversation(participants: $participants) {
      id
      participants {
        _id
        username
        email
      }
      messages {
        content
        sender {
          _id
          username
        }
        timestamp
      }
    }
  }
`;