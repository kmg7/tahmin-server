require('dotenv').config();
require('./utils/authentication').initializeAuthService();
const logger = require('./utils/logger');
const express = require('express');
const app = express();
const { xss, helmet, mainLimiter } = require('./middleware/security');
const main = '/api/v1';
const { authenticateUser, authorizePermissions } = require('./middleware/authentication');
//middleware
app.use(mainLimiter);
app.use(xss());
app.use(helmet());
app.disable('x-powered-by');
app.use(express.json());
//route
app.use(main, require('./components/auth/auth_route'));
app.use(main, authenticateUser, authorizePermissions('C'), require('./components/match/match_route'));
app.use(main, authenticateUser, authorizePermissions('C'), require('./components/team/team_route'));
app.use(main, authenticateUser, authorizePermissions('C'), require('./components/country/country_route'));
app.use(main, authenticateUser, authorizePermissions('C'), require('./components/match_score/match_score_route'));
app.use(main, authenticateUser, authorizePermissions('B'), require('./components/user/user_route'));
app.use(main, authenticateUser, authorizePermissions('A'), require('./components/prediction/prediction_route'));
app.use(main, authenticateUser, authorizePermissions('C'), require('./components/standings/standings_route'));
app.use(main, authenticateUser, authorizePermissions('C'), require('./components/score/score_route'));

app.get('/', (req, res) => {
  res.send('Tahmin API v1 BETA');
});
app.get('/debug', authenticateUser, async (req, res, next) => {
  console.log(req.user);
  res.json('debug');
});
const start = async () => {
  try {
    app.listen(process.env.PORT, () => logger.info(`🚀 Server is listening on ${process.env.HOST} port ${process.env.PORT}`));
  } catch (error) {
    logger.error(error);
  }
};
start();
