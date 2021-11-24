const CustomError = require('./CustomError');

class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(message) {
    super(this.statusCode, message);
  }

  serializeErrors() {
    return [{ messag: this.message }];
  }
}

module.exports = BadRequestError;
