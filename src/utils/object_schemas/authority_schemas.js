import Joi from 'joi';

import {
  stringMinTwo,
  stringMinTwoRequired,
  arrayStringMinTwoRequired,
  bool,
  sortOrder,
  filterConditionsStandart,
} from './common_schemas.js';

export const Create = Joi.object({
  id: stringMinTwo,
  featureId: stringMinTwoRequired,
  moderatorId: stringMinTwoRequired,
  role: stringMinTwoRequired,
}).required();

export const CreateMany = Joi.array().items(Create).min(2).required();

export const Find = Joi.object({
  field: Joi.string().allow('id').only().required(),
  value: stringMinTwoRequired,
}).required();

export const FindMany = Joi.object({
  field: Joi.string().allow('id').only().required(),
  value: arrayStringMinTwoRequired,
}).required();

export const Search = Joi.object({
  field: Joi.string().allow('id', 'featureId', 'moderatorId', 'role', 'createdAt', 'updatedAt').only().required(),
  condition: filterConditionsStandart,
  value: stringMinTwoRequired,
}).required();

export const Update = Joi.object({
  role: stringMinTwoRequired,
}).required();

export const Upsert = Joi.array()
  .items(Joi.object({ where: Find, update: Update, create: Create }))
  .min(1)
  .required();

export const Sort = Joi.object({
  sortBy: Joi.string().allow('id', 'featureId', 'moderatorId', 'role', 'createdAt', 'updatedAt').only().required(),
  order: sortOrder,
}).required();

export const Select = Joi.object({
  id: bool,
  featureId: bool,
  moderatorId: bool,
  role: bool,
  createdAt: bool,
  updatedAt: bool,
  moderator: bool,
  feature: bool,
}).required();
