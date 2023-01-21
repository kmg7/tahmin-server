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

const createMatch = async (req, res) => {
  await manager.create(req, res, fields);
};

const createManyMatch = async (req, res) => {
  await manager.createMany(req, res, fields);
};

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

const updateMatch = async (req, res) => {
  await manager.update(req, res, fields);
};

const upsertMatch = async (req, res) => {
  await manager.upsert(req, res, fields);
};

const deleteMatch = async (req, res) => {
  await manager.remove(req, res, fields);
};

const deleteManyMatch = async (req, res) => {
  await manager.removeMany(req, res, fields);
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

export {
  createMatch,
  createManyMatch,
  getMatch,
  getAllMatches,
  getMatchProperty,
  searchMatch,
  updateMatch,
  upsertMatch,
  deleteMatch,
  deleteManyMatch,
};
