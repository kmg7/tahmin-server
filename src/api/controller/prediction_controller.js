import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { ControllerManager } from '../../utils/controller/controller_manager.js';
import * as validationSchemas from '../../utils/object_schemas/prediction_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({
    ormManager: new ORMManager({ model: Models.PREDICTION }),
    validationSchemas: validationSchemas,
  }),
});

const createPrediction = async (req, res) => {
  await manager.create(req, res, fields);
};

const createManyPrediction = async (req, res) => {
  await manager.createMany(req, res, fields);
};

const getPrediction = async (req, res) => {
  await manager.get(req, res, fields);
};

const getAllPredictions = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchPrediction = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const updatePrediction = async (req, res) => {
  await manager.update(req, res, fields);
};

const upsertPrediction = async (req, res) => {
  await manager.upsert(req, res, fields);
};

const deletePrediction = async (req, res) => {
  await manager.remove(req, res, fields);
};

const deleteManyPrediction = async (req, res) => {
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
  createPrediction,
  createManyPrediction,
  getPrediction,
  getAllPredictions,
  searchPrediction,
  updatePrediction,
  upsertPrediction,
  deletePrediction,
  deleteManyPrediction,
};
