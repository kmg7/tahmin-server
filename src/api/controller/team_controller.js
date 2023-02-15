import { ControllerManager } from '../../utils/controller/controller_manager.js';
import { ORMManager } from '../../utils/database/sql/orm_manager.js';
import { Models } from '../../utils/database/sql/orm_models.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import * as schemas from '../../utils/object_schemas/team_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({ ormManager: new ORMManager({ model: Models.TEAM }), validationSchemas: schemas }),
});

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

export { getTeam, getAllTeams, searchTeam, getTeamProperty };
