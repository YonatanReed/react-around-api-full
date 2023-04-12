const winston = require('winston');
const expressWinston = require('express-winston');

const requestLog = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/request.log',
    }),
  ],
  format: winston.format.json(),
});

const errorLog = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
    }),
  ],
  format: winston.format.json(),
});

module.exports = { requestLog, errorLog };
