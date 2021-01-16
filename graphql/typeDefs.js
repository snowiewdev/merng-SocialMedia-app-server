const { gql } = require('apollo-server');

// define graphQL query settings, !=required 
module.exports = gql` 
  type Post{
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type User{
    id: ID!
    username: String!
    email: String!
    token: String!
    createdAt: String!
  }
  type Comment{
    id: ID!
    createdAt: String!
    username: String!
    body: String!
    likes: [CommentLike]!
    likeCount: Int!
  }
  type Like{
    id: ID!
    createdAt: String!
    username: String!
  }
  type CommentLike{
    id: ID!
    createdAt: String!
    username: String!
  }
  input RegisterInput{
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query{
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation{
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    likePost(postId: ID!): Post!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likeComment(postId: ID!, commentId: ID!): Post!
  }
  type Subscription{
    newPost: Post!
  }
`
// take-in data: return data
// TODO extra function ideas: edit post function? subscription lacks front-end in tutorial