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
  id: stringMinTwoRequired,
  tournamentId: stringMinTwoRequired,
}).required();

export const CreateMany = Joi.array().items(Create).min(2).required();

export const Find = Joi.object({
  field: Joi.string().allow('id', 'tournamentId').only().required(),
  value: stringMinTwoRequired,
}).required();

export const FindMany = Joi.object({
  field: Joi.string().allow('id', 'tournamentId').only().required(),
  value: arrayStringMinTwoRequired,
}).required();

export const Search = Joi.object({
  field: Joi.string().allow('id', 'tournamentId').only().required(),
  condition: filterConditionsStandart,
  value: stringMinTwoRequired,
}).required();

export const Update = Joi.object({
  id: stringMinTwo,
  tournamentId: stringMinTwo,
}).required();

export const Upsert = Joi.array()
  .items(Joi.object({ where: Find, update: Update, create: Create }))
  .min(1)
  .required();

export const Sort = Joi.object({
  sortBy: Joi.string().allow('id', 'tournamentId').only().required(),
  order: sortOrder,
}).required();

export const Select = Joi.object({
  id: bool,
  tournamentId: bool,
  tournament: bool,
  scores: bool,
}).required();
