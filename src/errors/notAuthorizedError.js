const CustomError = require('./CustomError');

class NotAuthorizedError extends CustomError {
  constructor() {
    super('Not Authorized');
    this.statusCode = 401;
  }
}

module.exports = NotAuthorizedError;
