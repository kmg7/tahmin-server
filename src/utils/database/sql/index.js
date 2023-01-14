import dbClient from './db_client';
import dbError from './db_error_parser';
const Models = {
  MATCH: dbClient.match,
  MATCH_SCORE: dbClient.matchScore,
  TOURNAMENT: dbClient.tournament,
  STAGE: dbClient.stage,
  PREDICTION: dbClient.prediction,
  SCORE: dbClient.score,
  STANDINGS: dbClient.standings,
  TEAM: dbClient.team,
  COUNTRY: dbClient.country,
  USER: dbClient.user,
};
import dbModel from './db_model';

export default {
  dbClient,
  dbError,
  dbModel,
  Models,
};
