import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { ControllerManager } from '../../utils/controller/controller_manager.js';
import * as validationSchemas from '../../utils/object_schemas/match_score_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({
    ormManager: new ORMManager({ model: Models.MATCH_SCORE }),
    validationSchemas: validationSchemas,
  }),
});

const getMatchScore = async (req, res) => {
  await manager.get(req, res, fields);
};

const getAllMatchScores = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchMatchScore = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const fields = {
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

export { getMatchScore, getAllMatchScores, searchMatchScore };
