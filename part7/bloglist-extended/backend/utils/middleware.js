const jwt = require('jsonwebtoken');
const logger = require('./logger');

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Hostname:', request.headers.host);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('URL:  ', request.url);
  logger.info('---');
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = (request, response, next) => {
  if (request.path === '/api/login') {
    return next();
  }

  tokenExtractor(request, response, () => {
    try {
      if (!request.token) {
        return next();
      }
      const decodedToken = jwt.verify(request.token, process.env.SECRET);
      if (!decodedToken.id) {
        return next('invalid token 2');
      }
      request.userId = decodedToken.id;
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
