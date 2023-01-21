import { ControllerManager } from '../../utils/controller/controller_manager.js';
import { ORMManager } from '../../utils/database/sql/orm_manager.js';
import { Models } from '../../utils/database/sql/orm_models.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import * as schemas from '../../utils/object_schemas/user_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({ ormManager: new ORMManager({ model: Models.USER }), validationSchemas: schemas }),
});

const createUser = async (req, res) => {
  await manager.create(req, res, fields);
};

const createManyUser = async (req, res) => {
  await manager.createMany(req, res, fields);
};

const getUser = async (req, res) => {
  await manager.get(req, res, fields);
};

const getUserProperty = async (req, res) => {
  await manager.getProperty(req, res, { scores: scoreFields, predictions: predictionFields });
};

const getAllUsers = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchUser = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const updateUser = async (req, res) => {
  await manager.update(req, res, fields);
};

const upsertUser = async (req, res) => {
  await manager.upsert(req, res, fields);
};

const deleteUser = async (req, res) => {
  await manager.remove(req, res, fields);
};

const deleteManyUser = async (req, res) => {
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
  user: false,
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

export {
  createUser,
  createManyUser,
  getUser,
  getUserProperty,
  searchUser,
  getAllUsers,
  updateUser,
  upsertUser,
  deleteUser,
  deleteManyUser,
};
