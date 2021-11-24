const jwt = require('jsonwebtoken');
const NotAuthorizedError = require('../errors/notAuthorizedError');

// Must run after current-user middleware
const withAuth = async (req, res, next) => {
  if (!req.currentUser) throw new NotAuthorizedError();

  next();
};

module.exports = withAuth;
