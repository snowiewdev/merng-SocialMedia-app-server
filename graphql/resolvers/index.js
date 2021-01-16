const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentsResolvers = require('./comments');

//resolvers used to run logics in queries
module.exports = {
  Post:{ //modifiers -- every query & mutation will go thru it
    likeCount: (parent) =>  parent.likes.length,
    commentCount: (parent) => parent.comments.length
  },
  Comment:{
    likeCount: (parent) => parent.likes.length
  },
  Query:{
    ...postsResolvers.Query
  },
  Mutation:{
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentsResolvers.Mutation
  },
  Subscription:{
    ...postsResolvers.Subscription
  }
}