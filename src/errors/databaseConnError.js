const CustomError = require('./CustomError');

class DatabaseConnectionError extends CustomError {
  constructor() {
    super('Error connecting to Database');
    this.statusCode = 500;
  }
}

module.exports = DatabaseConnectionError;
