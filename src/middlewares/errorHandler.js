const CustomError = require('../errors/CustomError');

const errorHandler = (err, req, res) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: [...err] });
  }
  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};

module.exports = errorHandler;
