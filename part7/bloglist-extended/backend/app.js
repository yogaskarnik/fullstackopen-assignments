const config = require('./utils/config');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const blogRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);
logger.info('connecting to ', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB ', error.message);
  });

app.use(cors());
app.use(express.static('build'));
app.use(express.json());

app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use('/api/login', loginRouter);
app.use('/api/blogs', middleware.userExtractor, blogRouter);
app.use('/api/users', usersRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(express.static(path.join(__dirname, './public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
