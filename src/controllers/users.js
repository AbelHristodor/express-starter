const User = require('../models/User');
const BadRequestError = require('../errors/badRequestError');

const getAll = async (req, res, next) => {
  /* Return all user's public fields*/
  try {
    const users = await User.findAll();
    const result = users.map((user) => user.publicFields());
    return res.status(200).send(result);
  } catch (err) {
    next(new BadRequestError('Unknown Error'));
  }
};

module.exports = {
  getAll,
};
