// Generic Error Handler
class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }

  serializeErrors() {
    return [{ message: 'Internal Server Error' }];
  }
}

module.exports = CustomError;
