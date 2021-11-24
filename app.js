const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Config and Helpers
const db = require('./config/db');
const logger = require('./config/winston');
const morganMiddleware = require('./config/morgan');
const corsOptions = require('./config/cors');

// Error Handler & Errors
const errorHandler = require('./src/middlewares/errorHandler');
const NotFoundError = require('./src/errors/notFoundError');

// Standard middlewares
app.use(morganMiddleware);
app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// API routes
app.use('/api/user', require('./src/routes/user'));

// Route not found middleware
// eslint-disable-next-line no-unused-vars
app.all('*', async (req, res, next) => {
  throw new NotFoundError();
});

// Error handlers after all other middlewares
app.use(errorHandler);

// Starting Server
const port = process.env.EXPRESS_PORT || 4000;
const host = process.env.EXPRESS_HOST || 'localhost';

const start = async () => {
  try {
    await db.sync({ force: true }); // Reset DB every time

    app.listen(port, () => {
      logger.info(`Listening: http://${host}:${port}`);
    });
  } catch (err) {
    logger.error(err);
  }
};

start();
