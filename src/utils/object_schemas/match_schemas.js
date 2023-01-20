import Joi from 'joi';
import {
  stringMinTwo,
  stringMinTwoRequired,
  arrayStringMinTwoRequired,
  bool,
  sortOrder,
  filterConditionsStandart,
  dateRequired,
  date,
} from './common_schemas.js';

import { Sort as PredictionSort, Search as PredictionSearch, Select as PredictionSelect } from './prediction_schemas.js';

export const Create = Joi.object({
  id: stringMinTwoRequired,
  dateTime: dateRequired,
  homeTeamId: stringMinTwoRequired,
  awayTeamId: stringMinTwoRequired,
  stageId: stringMinTwoRequired,
}).required();

export const CreateMany = Joi.array().items(Create).min(1).required();

export const Find = Joi.object({
  field: Joi.string().allow('id').only().required(),
  value: stringMinTwoRequired,
}).required();

export const FindMany = Joi.object({
  field: Joi.string().allow('id').only().required(),
  value: arrayStringMinTwoRequired,
}).required();

export const Search = Joi.object({
  field: Joi.string().allow('id', 'stageId', 'homeTeamId', 'awayTeamId', 'dateTime').only().required(),
  condition: filterConditionsStandart,
  value: stringMinTwoRequired,
}).required();

export const Property = Joi.object({
  id: stringMinTwoRequired,
  prop: Joi.string().allow('predictions').only(),
  sort: PredictionSort,
  select: PredictionSelect,
});

export const PropertySearch = Joi.object({
  prop: Joi.string().allow('predictions').only(),
  search: PredictionSearch,
});

export const Update = Joi.object({
  id: stringMinTwo,
  dateTime: date,
  homeTeamId: stringMinTwo,
  awayTeamId: stringMinTwo,
  stageId: stringMinTwo,
}).required();

export const Upsert = Joi.array()
  .items(Joi.object({ where: Find, update: Update, create: Create }))
  .min(1)
  .required();

export const Sort = Joi.object({
  sortBy: Joi.string().allow('homeTeamId', 'stageId', 'id', 'awayTeamId', 'dateTime').only().required(),
  order: sortOrder,
}).required();

export const Select = Joi.object({
  id: bool,
  dateTime: bool,
  homeTeamId: bool,
  awayTeamId: bool,
  stageId: bool,
  predictions: bool,
}).required();
