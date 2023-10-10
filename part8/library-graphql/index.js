require('dotenv').config();
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');

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
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), 'secret');
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
