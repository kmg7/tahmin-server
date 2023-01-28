import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { ControllerManager } from '../../utils/controller/controller_manager.js';
import * as validationSchemas from '../../utils/object_schemas/authority_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({
    ormManager: new ORMManager({ model: Models.AUTHORITY }),
    validationSchemas: validationSchemas,
  }),
});

const createAuthority = async (req, res) => {
  await manager.create(req, res, fields);
};

const createManyAuthority = async (req, res) => {
  await manager.createMany(req, res, fields);
};

const getAuthority = async (req, res) => {
  await manager.get(req, res, fields);
};

const getAuthorityProperty = async (req, res) => {
  await manager.getProperty(req, res, { feature: featureFields });
};

const getAllAuthority = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchAuthority = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const updateAuthority = async (req, res) => {
  await manager.update(req, res, fields);
};

const upsertAuthority = async (req, res) => {
  await manager.upsert(req, res, fields);
};

const deleteAuthority = async (req, res) => {
  await manager.remove(req, res, fields);
};

const deleteManyAuthority = async (req, res) => {
  await manager.removeMany(req, res, fields);
};

const fields = {
  id: true,
  featureId: true,
  moderatorId: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

const featureFields = {
  id: true,
  name: true,
};

export {
  createAuthority,
  createManyAuthority,
  getAuthority,
  getAllAuthority,
  getAuthorityProperty,
  searchAuthority,
  updateAuthority,
  upsertAuthority,
  deleteAuthority,
  deleteManyAuthority,
};
