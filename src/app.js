require('dotenv').config();
const express = require('express');
const app = express();
const vermodel = require('./components/status/status_model');
const tournament = require('./components/match/tournament/tournament_controller');
const main = '/api/v1';
app.use(express.json());
app.use(main, require('./components/match/match_route'));
app.use(main, require('./components/team/team_route'));
app.use(main, require('./components/match_score/match_score_route'));
app.use(main, require('./components/user/user_route'));
app.use(main, require('./components/prediction/prediction_route'));

app.get('/', (req, res) => {
  vermodel.readVersion();
  res.send('done');
});
app.get('/debug', (req, res) => {
  tournament.createTournament(req, res);
});
const start = async () => {
  try {
    app.listen(process.env.PORT, () => console.log(`🚀 Server is listening on ${process.env.HOST} port ${process.env.PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
