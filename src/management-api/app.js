// import logger from '../utils/logger.js';
import express from 'express';
// import xss from 'xss-clean';
// import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import { initializeAuthService } from '../utils/authentication/index.js';
import routes from './routes.js';
import notFoundMiddleware from './middleware/notFound.js';
import { validateContentType } from './middleware/request-validate.js';

// dotenv.config();
initializeAuthService();

const main = '/v1';
const app = express();
const mainLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 60,
});

//middleware
app.use(mainLimiter);
app.use(validateContentType);
// app.use(xss());
// app.use(helmet());
// app.disable('x-powered-by');
// app.use(express.json());

//route
app.use(main, routes);
app.use(notFoundMiddleware);

app.get(main, (req, res) => {
  res.send('Tahmin Management API v1');
});

// const start = async () => {
//   try {
//     app.listen(process.env.PORT, () =>
//       logger.info(`🚀 Server is listening on ${process.env.HOST} port ${process.env.PORT} mode:${process.env.NODE_ENV}`)
//     );
//   } catch (error) {
//     logger.error(error);
//   }
// };
// // app.get('/debug', authenticateUser, async (req, res, next) => {
// //   res.json('debug');
// // });
// start();

export default app;
