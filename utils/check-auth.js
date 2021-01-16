const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

module.exports = (context) => {
  const authHeader = context.req.headers.authorization;
  if (authHeader){
    // default header format: "Bearer ...", ... = token
    const token = authHeader.split('Bearer ')[1];

    if (token){
      try{
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch(err){
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    //confirm user is who he/she is
    throw new Error('Authenication token must be \'Bearer [token]');
  }

  //permission to access resources
  throw new Error('Authorization header must be provided');

};