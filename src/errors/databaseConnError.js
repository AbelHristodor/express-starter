const CustomError = require('./CustomError');

class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  message = 'Error connecting to Database';

  constructor() {
    super(this.statusCode, this.message);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

module.exports = DatabaseConnectionError;
