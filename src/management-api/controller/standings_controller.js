import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { ControllerManager } from '../../utils/controller/controller_manager.js';
import * as validationSchemas from '../../utils/object_schemas/standings_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({
    ormManager: new ORMManager({ model: Models.STANDINGS }),
    validationSchemas: validationSchemas,
  }),
});

const createStandings = async (req, res) => {
  await manager.create(req, res, fields);
};

const createManyStandings = async (req, res) => {
  await manager.createMany(req, res, fields);
};

const getStandings = async (req, res) => {
  await manager.get(req, res, fields);
};

const getStandingsProperty = async (req, res) => {
  await manager.getProperty(req, res, { score: scoreFields });
};

const getAllStandings = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchStandings = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const updateStandings = async (req, res) => {
  await manager.update(req, res, fields);
};

const upsertStandings = async (req, res) => {
  await manager.upsert(req, res, fields);
};

const deleteStandings = async (req, res) => {
  await manager.remove(req, res, fields);
};

const deleteManyStandings = async (req, res) => {
  await manager.removeMany(req, res, fields);
};

const fields = {
  id: true,
  tournamentId: true,
  scores: true,
};

const scoreFields = {
  id: true,
  username: true,
  standingsId: true,
  user: false,
};

export {
  createStandings,
  createManyStandings,
  getStandings,
  getAllStandings,
  getStandingsProperty,
  searchStandings,
  updateStandings,
  upsertStandings,
  deleteStandings,
  deleteManyStandings,
};
