/* eslint-disable no-empty */
const jwt = require('jsonwebtoken');

const currentUser = async (req, res, next) => {
  if (!req.session.jwt) return next();

  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_SECRET);
    req.currentUser = payload;
  } catch (err) {}
  return next();
};

module.exports = currentUser;
