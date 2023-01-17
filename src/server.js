import express from 'express';
import dotenv from 'dotenv';
import xss from 'xss-clean';
import helmet from 'helmet';

import logger from './utils/logger.js';
import management_app from './management-api/app.js';
dotenv.config();

const server = express();

server.use(xss());
server.use(helmet());
server.disable('x-powered-by');
server.use(express.json());
server.use('/management', management_app);

server.get('/', (req, res) => {
  res.send('Tahmin API v1 BETA');
});

const start = async () => {
  try {
    server.listen(process.env.PORT, () =>
      logger.info(`🚀 Server is listening on ${process.env.HOST} port ${process.env.PORT} mode:${process.env.NODE_ENV}`)
    );
  } catch (error) {
    logger.error(error);
  }
};
start();
