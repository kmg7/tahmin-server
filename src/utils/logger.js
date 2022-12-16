const { createLogger, transports, format } = require('winston');

const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `[${info.timestamp}]${info.level.toUpperCase().padStart(7)}  ${info.message}`;
  })
);

let logger = createLogger({
  format: customFormat,
  transports: [
    new transports.Console({ level: 'silly' }),
    new transports.File({ filename: require('path').join('logs', `${new Date().toDateString()}.log`), level: 'info' }),
  ],
});

module.exports = logger;
