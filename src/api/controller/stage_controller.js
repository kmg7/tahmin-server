import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { ControllerManager } from '../../utils/controller/controller_manager.js';
import * as validationSchemas from '../../utils/object_schemas/stage_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({
    ormManager: new ORMManager({ model: Models.STAGE }),
    validationSchemas: validationSchemas,
  }),
});

const getStage = async (req, res) => {
  await manager.get(req, res, fields);
};

const getStageProperty = async (req, res) => {
  await manager.getProperty(req, res, { matches: matchFields, matchScores: matchScoreFields });
};

const getAllStages = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchStage = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const fields = {
  id: true,
  active: true,
  tournamentId: true,
  name: true,
  matches: false,
  tournament: false,
  createdAt: true,
  updatedAt: true,
  matchScores: false,
};

const matchFields = {
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

const matchScoreFields = {
  id: true,
  stageId: true,
  homeScore: true,
  awayScore: true,
  stage: false,
};

export { getStage, getAllStages, getStageProperty, searchStage };
