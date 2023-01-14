import dotenv from 'dotenv';
import logger from './utils/logger.js';
import express from 'express';
import xss from 'xss-clean';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
import { initializeAuthService } from './utils/authentication/index.js';
import { authenticateUser, authorizePermissions } from './middleware/authentication.js';

dotenv.config();
initializeAuthService();

const main = '/api/v1';
const app = express();
const mainLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 60,
});

//middleware
app.use(mainLimiter);
app.use(xss());
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());

//route
// app.use(main, require('./routes/auth_route'));
// app.use(main, authenticateUser, authorizePermissions('C'), require('./routes/match_route'));
// app.use(main, authenticateUser, authorizePermissions('C'), require('./routes/team_route'));
// app.use(main, authenticateUser, authorizePermissions('C'), require('./routes/country_route'));
// app.use(main, authenticateUser, authorizePermissions('C'), require('./routes/match_score_route'));
// app.use(main, authenticateUser, authorizePermissions('B'), require('./routes/user_route'));
// app.use(main, authenticateUser, authorizePermissions('A'), require('./routes/prediction_route'));
// app.use(main, authenticateUser, authorizePermissions('C'), require('./routes/standings_route'));
// app.use(main, authenticateUser, authorizePermissions('C'), require('./routes/score_route'));

app.get('/', (req, res) => {
  res.send('Tahmin API v1 BETA');
});

const start = async () => {
  try {
    app.listen(process.env.PORT, () =>
      logger.info(`🚀 Server is listening on ${process.env.HOST} port ${process.env.PORT} mode:${process.env.NODE_ENV}`)
    );
  } catch (error) {
    logger.error(error);
  }
};
// app.get('/debug', authenticateUser, async (req, res, next) => {
//   res.json('debug');
// });
start();
