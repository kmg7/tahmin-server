import { createLogger, transports, format } from 'winston';
import path from 'path';
const filename = path.join('logs', `${new Date().toDateString()}.log`);
const customFormat = format.combine(
  format.timestamp(),
  format.printf((info) => {
    return `[${info.timestamp}]${info.level.toUpperCase().padStart(7)}  ${info.message}`;
  })
);

let logger = createLogger({
  format: customFormat,
  transports: [new transports.Console({ level: 'silly' }), new transports.File({ filename: filename, level: 'info' })],
});

export default logger;
