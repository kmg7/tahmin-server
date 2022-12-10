const dbClient = require('./db_client');
const dbError = require('./db_error_parser');
const Models = {
  MATCH: dbClient.match,
  MATCH_SCORE: dbClient.matchScore,
  TOURNAMENT: dbClient.tournament,
  STAGE: dbClient.stage,
  PREDICTION: dbClient.prediction,
  SCORE: dbClient.score,
  STANDINGS: dbClient.standings,
  TEAM: dbClient.team,
  USER: dbClient.user,
};
const dbModel = require('./db_model');
module.exports = {
  dbClient,
  dbError,
  dbModel,
  Models,
};
