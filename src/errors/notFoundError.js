const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
  constructor(message) {
    super(message);
    this.message = 'Route not found';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
