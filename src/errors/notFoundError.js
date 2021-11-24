const CustomError = require('./CustomError');

class NotFoundError extends CustomError {
  statusCode = 404;
  constructor() {
    super(this.statusCode, 'Route not found');
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}

module.exports = NotFoundError;
