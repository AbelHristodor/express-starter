const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');

require('express-async-errors');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Config and Helpers
const db = require('./config/db');
const logger = require('./config/winston');
const morganMiddleware = require('./config/morgan');
const corsOptions = require('./config/cors');
const passport = require('./config/passport-config');

// Error Handler & Errors
const errorHandler = require('./src/middlewares/errorHandler');
const NotFoundError = require('./src/errors/notFoundError');

// Standard middlewares
app.use(morganMiddleware);
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(
  cookieSession({
    signed: false,
    secure: false, // TODO: Change to true when in SSL
  }),
);
app.use(express.json());
app.use(passport.initialize());

// API routes
app.use('/api/user', require('./src/routes/user'));

// Route not found middleware
// eslint-disable-next-line no-unused-vars
app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

// Error handlers after all other middlewares
app.use(errorHandler);

// Starting Server
const port = process.env.EXPRESS_PORT || 4000;
const host = process.env.EXPRESS_HOST || 'localhost';

const start = async () => {
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error('JWT env vars not defined');
  }

  try {
    logger.info(
      'MongoDB Status: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting ',
    );
    logger.info('Status: %d', db.connection.readyState);

    app.listen(port, () => {
      logger.info(`Listening: http://${host}:${port}`);
    });
  } catch (err) {
    logger.error(err);
  }
};

start();
