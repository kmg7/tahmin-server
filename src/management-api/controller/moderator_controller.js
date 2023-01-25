import { ControllerManager } from '../../utils/controller/controller_manager.js';
import { ORMManager } from '../../utils/database/sql/orm_manager.js';
import { Models } from '../../utils/database/sql/orm_models.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import * as schemas from '../../utils/object_schemas/moderator_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({ ormManager: new ORMManager({ model: Models.MODERATOR }), validationSchemas: schemas }),
});

const createModerator = async (req, res) => {
  await manager.create(req, res, fields);
};

const createManyModerator = async (req, res) => {
  await manager.createMany(req, res, fields);
};

const getModerator = async (req, res) => {
  await manager.get(req, res, fields);
};

const getModeratorProperty = async (req, res) => {
  await manager.getProperty(req, res, { scores: scoreFields, predictions: predictionFields });
};

const getAllModerators = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchModerator = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const updateModerator = async (req, res) => {
  await manager.update(req, res, fields);
};

const upsertModerator = async (req, res) => {
  await manager.upsert(req, res, fields);
};

const deleteModerator = async (req, res) => {
  await manager.remove(req, res, fields);
};

const deleteManyModerator = async (req, res) => {
  await manager.removeMany(req, res);
};

const fields = {
  id: true,
  authId: true,
  username: true,
  email: true,
  role: true,
  password: true,
  createdAt: true,
  updatedAt: true,
  scores: false,
  predictions: false,
};

const scoreFields = {
  id: true,
  username: true,
  standingsId: true,
  Moderator: false,
};

const predictionFields = {
  id: true,
  matchId: true,
  ModeratorId: true,
  homeScore: true,
  awayScore: true,
  processed: true,
  createdAt: true,
  updatedAt: true,
  match: false,
  Moderator: false,
};

export {
  createModerator,
  createManyModerator,
  getModerator,
  getModeratorProperty,
  searchModerator,
  getAllModerators,
  updateModerator,
  upsertModerator,
  deleteModerator,
  deleteManyModerator,
};
