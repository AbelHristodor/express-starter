const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
  constructor() {
    super('Route not found');
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
