const path = require('path');
const winston = require('winston');

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// Configuring Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  // defaultMeta: { service: 'user - service' }
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
