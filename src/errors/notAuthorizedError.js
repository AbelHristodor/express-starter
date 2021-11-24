const CustomError = require('./CustomError');

class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super(this.statusCode, 'Not Authorized');
  }

  serializeErrors() {
    return [{ message: 'Not Authorized' }];
  }
}

module.exports = NotAuthorizedError;
