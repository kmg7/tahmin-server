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

const getScore = async (req, res) => {
  await manager.get(req, res, fields);
};

const getAllScores = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchScore = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const fields = {
  id: true,
  username: true,
  standingsId: true,
  user: false,
};

export { getScore, getAllScores, searchScore };
