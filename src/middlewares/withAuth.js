const NotAuthorizedError = require('../errors/notAuthorizedError');

// Must run after current-user middleware
const withAuth = async (req, res, next) => {
  if (!req.currentUser) next(new NotAuthorizedError());

  next();
};

module.exports = withAuth;
