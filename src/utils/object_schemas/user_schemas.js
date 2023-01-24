import Joi from 'joi';

import {
  stringMinTwo,
  stringMinTwoRequired,
  arrayStringMinTwoRequired,
  bool,
  sortOrder,
  filterConditionsStandart,
  urlRequired,
  url,
} from './common_schemas.js';

import { Search as ScoreSearch, Sort as ScoreSort, Select as ScoreSelect } from './score_schemas.js';
import { Search as PredictionSearch, Sort as PredictionSort, Select as PredictionSelect } from './prediction_schemas.js';

export const Create = Joi.object({
  id: stringMinTwoRequired,
  code: stringMinTwoRequired,
  name: stringMinTwoRequired,
  logoUrl: urlRequired,
}).required();

export const CreateMany = Joi.array().items(Create).min(2).required();

export const Find = Joi.object({
  field: Joi.string().allow('username', 'email', 'authId', 'id').only().required(),
  value: stringMinTwoRequired,
}).required();

export const FindMany = Joi.object({
  field: Joi.string().allow('username', 'email', 'authId', 'id').only().required(),
  value: arrayStringMinTwoRequired,
}).required();

export const Search = Joi.object({
  field: Joi.string().allow('username', 'email', 'authId', 'id', 'createdAt', 'updatedAt').only().required(),
  condition: filterConditionsStandart,
  value: stringMinTwoRequired,
}).required();

export const Property = Joi.object({
  id: stringMinTwoRequired,
  prop: Joi.string().allow('scores', 'predictions').only(),
  sort: Joi.when('prop', {
    is: 'scores',
    then: ScoreSort,
    otherwise: PredictionSort,
  }),
  select: Joi.when('prop', {
    is: 'scores',
    then: ScoreSelect,
    otherwise: PredictionSelect,
  }),
});

export const PropertySearch = Joi.object({
  prop: Joi.string().allow('scores', 'predictions').only(),
  search: Joi.when('prop', {
    is: 'scores',
    then: ScoreSearch,
    otherwise: PredictionSearch,
  }),
});

export const Update = Joi.object({
  id: stringMinTwo,
  code: stringMinTwo,
  countryCode: stringMinTwo,
  name: stringMinTwoRequired,
  logoUrl: url,
}).required();

export const Upsert = Joi.array()
  .items(Joi.object({ where: Find, update: Update, create: Create }))
  .min(1)
  .required();

export const Sort = Joi.object({
  sortBy: Joi.string().allow('username', 'email', 'createdAt', 'updatedAt', 'role').only().required(),
  order: sortOrder,
}).required();

export const Select = Joi.object({
  id: bool,
  authId: bool,
  username: bool,
  email: bool,
  role: bool,
  password: bool,
  createdAt: bool,
  updatedAt: bool,
  scores: bool,
  predictions: bool,
}).required();
