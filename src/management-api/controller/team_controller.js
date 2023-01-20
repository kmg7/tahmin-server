import { ControllerManager } from '../../utils/controller/controller_manager.js';
import { ORMManager } from '../../utils/database/sql/orm_manager.js';
import { Models } from '../../utils/database/sql/orm_models.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import * as schemas from '../../utils/object_schemas/team_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({ ormManager: new ORMManager({ model: Models.TEAM }), validationSchemas: schemas }),
});

const createTeam = async (req, res) => {
  await manager.create(req, res, fields);
};

const createManyTeam = async (req, res) => {
  await manager.createMany(req, res, fields);
};

const getTeam = async (req, res) => {
  await manager.get(req, res, fields);
};

const getTeamProperty = async (req, res) => {
  await manager.getProperty(req, res, { homeMatches: matchFields, awayMatches: matchFields });
};

const getAllTeams = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchTeam = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const updateTeam = async (req, res) => {
  await manager.update(req, res, fields);
};

const upsertTeam = async (req, res) => {
  await manager.upsert(req, res, fields);
};
const deleteTeam = async (req, res) => {
  await manager.remove(req, res, fields);
};

const deleteManyTeam = async (req, res) => {
  await manager.removeMany(req, res);
};

const fields = {
  id: true,
  code: true,
  name: true,
  logoUrl: true,
  countryCode: true,
};

const matchFields = {
  id: true,
  dateTime: true,
  homeTeamId: true,
  awayTeamId: true,
  stageId: true,
  predictions: false,
};

export {
  createTeam,
  createManyTeam,
  getTeam,
  getAllTeams,
  searchTeam,
  getTeamProperty,
  updateTeam,
  upsertTeam,
  deleteTeam,
  deleteManyTeam,
};
