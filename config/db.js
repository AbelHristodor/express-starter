// Database connection config file
const mongoose = require('mongoose');
const logger = require('./winston');
const DatabaseConnectionError = require('../src/errors/databaseConnError');

mongoose.Promise = global.Promise;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => logger.info('Connected to MongoDB'))
  .catch(() => {
    throw new DatabaseConnectionError();
  });

module.exports = mongoose;
