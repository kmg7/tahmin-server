import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { ControllerManager } from '../../utils/controller/controller_manager.js';
import * as validationSchemas from '../../utils/object_schemas/match_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({
    ormManager: new ORMManager({ model: Models.MATCH }),
    validationSchemas: validationSchemas,
  }),
});

const getMatch = async (req, res) => {
  await manager.get(req, res, fields);
};

const getMatchProperty = async (req, res) => {
  await manager.getProperty(req, res, { predictions: predictionFields });
};

const getAllMatches = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchMatch = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const fields = {
  id: true,
  homeTeamId: true,
  awayTeamId: true,
  stageId: true,
  dateTime: true,
  predictions: false,
  stage: false,
  homeTeam: false,
  awayTeam: false,
};

const predictionFields = {
  id: true,
  matchId: true,
  userId: true,
  homeScore: true,
  awayScore: true,
  processed: true,
  createdAt: true,
  updatedAt: true,
  match: false,
  user: false,
};

export { getMatch, getAllMatches, getMatchProperty, searchMatch };
