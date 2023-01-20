import Joi from 'joi';

import {
  stringMinTwo,
  stringMinTwoRequired,
  arrayStringMinTwoRequired,
  bool,
  sortOrder,
  filterConditionsStandart,
  integerPositive,
  integerPositiveRequired,
} from './common_schemas.js';

export const Create = Joi.object({
  id: stringMinTwo,
  matchId: stringMinTwoRequired,
  userId: stringMinTwoRequired,
  homeScore: integerPositiveRequired,
  awayScore: integerPositiveRequired,
}).required();

export const CreateMany = Joi.array().items(Create).min(2).required();

export const Find = Joi.object({
  field: Joi.string().allow('id', 'matchId_userId').required(),
  value: Joi.when('field', {
    is: 'matchId_userId',
    then: Joi.object({
      userId: stringMinTwoRequired,
      matchId: stringMinTwoRequired,
    }),
    otherwise: stringMinTwoRequired,
  }),
}).required();

export const FindMany = Joi.object({
  field: Joi.string().allow('id').only().required(),
  value: arrayStringMinTwoRequired,
}).required();

export const Search = Joi.object({
  field: Joi.string().allow('id', 'matchId', 'userId', 'processed', 'createdAt', 'updatedAt').only().required(),
  condition: filterConditionsStandart,
  value: stringMinTwoRequired,
}).required();

export const Update = Joi.object({
  homeScore: integerPositive,
  awayScore: integerPositive,
}).required();

export const Upsert = Joi.array()
  .items(Joi.object({ where: Find, update: Update, create: Create }))
  .min(1)
  .required();

export const Sort = Joi.object({
  sortBy: Joi.string().allow('matchId', 'id', 'userId', 'processed', 'createdAt', 'updatedAt').only().required(),
  order: sortOrder,
}).required();

export const Select = Joi.object({
  id: bool,
  matchId: bool,
  userId: bool,
  processed: bool,
  createdAt: bool,
  updatedAt: bool,
  homeScore: bool,
  awayScore: bool,
  match: bool,
  user: bool,
}).required();
