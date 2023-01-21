import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { ControllerManager } from '../../utils/controller/controller_manager.js';
import * as validationSchemas from '../../utils/object_schemas/match_score_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({
    ormManager: new ORMManager({ model: Models.SCORE }),
    validationSchemas: validationSchemas,
  }),
});

const createScore = async (req, res) => {
  await manager.create(req, res, fields);
};

const createManyScore = async (req, res) => {
  await manager.createMany(req, res, fields);
};

const getScore = async (req, res) => {
  await manager.get(req, res, fields);
};

// const getScoreProperty = async (req, res) => {
//   await manager.getProperty(req, res, { predictions: predictionFields });
// };

const getAllScores = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchScore = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const updateScore = async (req, res) => {
  await manager.update(req, res, fields);
};

const upsertScore = async (req, res) => {
  await manager.upsert(req, res, fields);
};

const deleteScore = async (req, res) => {
  await manager.remove(req, res, fields);
};

const deleteManyScore = async (req, res) => {
  await manager.removeMany(req, res, fields);
};

const fields = {
  id: true,
  username: true,
  standingsId: true,
  user: false,
};

export { createScore, createManyScore, getScore, getAllScores, searchScore, updateScore, upsertScore, deleteScore, deleteManyScore };
