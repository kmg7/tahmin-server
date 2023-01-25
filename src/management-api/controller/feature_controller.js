import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { ControllerManager } from '../../utils/controller/controller_manager.js';
import * as validationSchemas from '../../utils/object_schemas/feature_schemas.js';

const manager = new ControllerManager({
  service: new ServiceManager({
    ormManager: new ORMManager({ model: Models.FEATURE }),
    validationSchemas: validationSchemas,
  }),
});

const createFeature = async (req, res) => {
  await manager.create(req, res, fields);
};

const createManyFeature = async (req, res) => {
  await manager.createMany(req, res, fields);
};

const getFeature = async (req, res) => {
  await manager.get(req, res, fields);
};

const getFeatureProperty = async (req, res) => {
  await manager.getProperty(req, res, { authorizations: authorityFields });
};

const getAllFeatures = async (req, res) => {
  await manager.getMany(req, res, fields);
};

const searchFeature = async (req, res) => {
  await manager.getMany(req, res, fields, true);
};

const updateFeature = async (req, res) => {
  await manager.update(req, res, fields);
};

const upsertFeature = async (req, res) => {
  await manager.upsert(req, res, fields);
};

const deleteFeature = async (req, res) => {
  await manager.remove(req, res, fields);
};

const deleteManyFeature = async (req, res) => {
  await manager.removeMany(req, res, fields);
};

const fields = {
  id: true,
  name: true,
  authorizations: false,
};

const authorityFields = {
  id: true,
  featureId: true,
  moderatorName: true,
  role: true,
};

export {
  createFeature,
  createManyFeature,
  getFeature,
  getAllFeatures,
  getFeatureProperty,
  searchFeature,
  updateFeature,
  upsertFeature,
  deleteFeature,
  deleteManyFeature,
};
