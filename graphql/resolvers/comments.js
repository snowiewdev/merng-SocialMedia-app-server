const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utils/check-auth');

module.exports = {
  Mutation: {
    createComment: async (_, { postId, body }, context) =>{
      const { username } = checkAuth(context); //logged in
      if (body.trim()===""){
        throw new UserInputError('Empty comment', {
          errors: {
            body: 'Comment must not be empty'
          }
        });
      }

      const post = await Post.findById(postId);

      if (post){
        post.comments.unshift({
          body,
          username,
          createdAt: new Date().toISOString()
        });
        await post.save();
        return post
      } else {
        throw new UserInputError('Post not found');
      }

    },
    deleteComment: async(_, { postId, commentId }, context) => {
      const { username } = checkAuth(context); //logged in

      const post = await Post.findById(postId);

      if(post){
        const commentIndex = await post.comments.findIndex(c => c.id == commentId);

        if(post.comments[commentIndex].username === username) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError('Action not allowed');
        }

      } else{
        throw new UserInputError('Post not found');
      }
    },
    likeComment: async(_, {postId, commentId }, context) => {
      const { username } = checkAuth(context); 

      const post = await Post.findById(postId);
      if(post){
        const commentIndex = await post.comments.findIndex(c => c.id == commentId);

        if (commentIndex > -1 ) { // -1 means not found
          if (post.comments[commentIndex].likes.find(like => like.username == username)){
            //comment already liked before => unlike comment
            post.comments[commentIndex].likes =  post.comments[commentIndex].likes.filter(like => like.username !== username);
          } else {
            //comment not liked before => like comment
            post.comments[commentIndex].likes.push({
              username,
              createdAt: new Date().toISOString()
            });
          }
          await post.save();
          return post;

        } else {
          throw new UserInputError('Comment not found');
        }

      } else {
        throw new UserInputError('Post not found');
      }
    }
  }
}