const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ash = require('express-async-handler');

const logger = require('../utils/logger');
const errorHandler = require('../utils/error_handler');

const router = express.Router();

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
})
  .then(() => logger.info('Successfully connected to MongoDB'))
  .catch((e) => logger.error('Cannot Connect to MongoDB:\n', e));

/*
// Defining Mongoose Schema
const todoSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    }
  });

  // Defining mongoose model
  const Todo = mongoose.model('Todo', todoSchema);
*/

router.get('/', ash(async (req, res, next) => {
  res.status(200).send({ success: true });
  // throw new errorHandler(500, "Error Message");
}));

module.exports = router;
