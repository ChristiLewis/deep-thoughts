//IMPORT
const express = require('express');
//APPOLO IMPORT
const { ApolloServer } = require('apollo-server-express');
//IMPORT TYPEDEFS AND RESOLVERS
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
//NEW APOLLO SERVER
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//NEW INSTANCE OF AN APOLLO SERVER W GRAPHQL CHEMA
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //MIDDLEWARE
  server.applyMiddleware({ app })
};


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    //TESTING GQL API
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });

});

//CALL ASYNC TO START THE SERVER
startApolloServer(typeDefs, resolvers);