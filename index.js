//dependencies imports
const { ApolloServer, PubSub } = require('apollo-server'); //includes express
const mongoose = require('mongoose'); //library to connect with mongoDB

//relative imports
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { DB } = require('./config');

const pubsub = new PubSub(); //for subscription function

const PORT = process.env.PORT || 5000 ;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req}) => ({req, pubsub}) //allow access to req at context
});

const dbURI = DB;

mongoose.connect(dbURI, {useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(()=>{
    console.log('MongoDB connected');
    return server.listen({ port: PORT }); })
  .then( (res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err);
  });