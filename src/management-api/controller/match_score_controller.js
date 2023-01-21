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

const createMatchScore = async (req, res) => {
  await manager.create(req, res, fields);
};

const createManyMatchScore = async (req, res) => {
  await manager.createMany(req, res, fields);
};

const getMatchScore = async (req, res) => {
  await manager.get(req, res, fields);
};

// const getMatchScoreProperty = async (req, res) => {
//   await manager.getProperty(req, res, { predictions: predictionFields });
// };

const getAllMatchScores = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchMatchScore = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const updateMatchScore = async (req, res) => {
  await manager.update(req, res, fields);
};

const upsertMatchScore = async (req, res) => {
  await manager.upsert(req, res, fields);
};

const deleteMatchScore = async (req, res) => {
  await manager.remove(req, res, fields);
};

const deleteManyMatchScore = async (req, res) => {
  await manager.removeMany(req, res, fields);
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

export {
  createMatchScore,
  createManyMatchScore,
  getMatchScore,
  getAllMatchScores,
  searchMatchScore,
  updateMatchScore,
  upsertMatchScore,
  deleteMatchScore,
  deleteManyMatchScore,
};
