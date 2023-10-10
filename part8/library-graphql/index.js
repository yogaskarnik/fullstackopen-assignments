require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');

const MONGO_DB_URI = process.env.MONGODB_URI;

console.log('connecting to ', MONGO_DB_URI);

mongoose
  .connect(MONGO_DB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message);
  });

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: process.env.PORT },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
