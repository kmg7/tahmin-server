import { NODE_ENV, PORT, HOST } from './config.js';
import express from 'express';
import xss from 'xss-clean';
import helmet from 'helmet';

import logger from './utils/logger.js';
import management_app from './management-api/app.js';
import app from './api/app.js';
import './utils/authentication/firebase_utils.js';

const server = express();

server.set('env', NODE_ENV);
server.use(xss());
server.use(helmet());
server.disable('x-powered-by');
server.use('/api', app);
server.use('/management', management_app);

server.get('/', (req, res) => {
  res.status(200).json('Tahmin API v1 BETA');
});

const start = async () => {
  try {
    server.listen(PORT, () => logger.info(`🚀 Server is listening on ${HOST} port ${PORT} mode:${NODE_ENV}`));
  } catch (error) {
    logger.error(error);
  }
};

start();
