import { ControllerManager } from '../../utils/controller/controller_manager.js';
import { ORMManager } from '../../utils/database/sql/orm_manager.js';
import { Models } from '../../utils/database/sql/orm_models.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import * as schemas from '../../utils/object_schemas/tournament_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({ ormManager: new ORMManager({ model: Models.TOURNAMENT }), validationSchemas: schemas }),
});

const getTournament = async (req, res) => {
  await manager.get(req, res, fields);
};

const getTournamentProperty = async (req, res) => {
  await manager.getProperty(req, res, { stages: stageFields, standings: standingsFields });
};

const getAllTournaments = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchTournament = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const fields = {
  id: true,
  countryCode: true,
  active: true,
  name: true,
  code: true,
  logoUrl: true,
  createdAt: true,
  updatedAt: true,
};

const stageFields = {
  id: true,
  active: true,
  tournamentId: true,
  name: true,
  matches: false,
  createdAt: true,
  updatedAt: true,
  matchScores: true,
  tournament: false,
};

const standingsFields = {
  id: true,
  tournamentId: true,
  tournament: false,
  scores: true,
};

export { getTournament, getTournamentProperty, searchTournament, getAllTournaments };
