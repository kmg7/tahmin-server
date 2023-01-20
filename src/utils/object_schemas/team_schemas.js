import Joi from 'joi';
import {
  arrayStringMinTwoRequired,
  filterConditionsStandart,
  sortOrder,
  stringMinTwo,
  stringMinTwoRequired,
  url,
  urlRequired,
  bool,
} from './common_schemas.js';

export const Create = Joi.object({
  id: stringMinTwoRequired,
  code: stringMinTwoRequired,
  name: stringMinTwoRequired,
  logoUrl: urlRequired,
  countryCode: stringMinTwoRequired,
}).required();

export const CreateMany = Joi.array().items(Create).min(2).required();

export const Find = Joi.object({
  field: Joi.string().allow('id', 'countryCode_code').required(),
  value: Joi.when('field', {
    is: 'countryCode_code',
    then: Joi.object({
      countryCode: stringMinTwoRequired,
      code: stringMinTwoRequired,
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
  id: stringMinTwo,
  code: stringMinTwo,
  countryCode: stringMinTwo,
  name: stringMinTwo,
  logoUrl: url,
}).required();

export const Upsert = Joi.array()
  .items(Joi.object({ where: Find, update: Update, create: Create }))
  .min(1)
  .required();

export const Sort = Joi.object({
  sortBy: Joi.string().allow('id', 'name', 'countryCode', 'code').only().required(),
  order: sortOrder,
}).required();

export const Select = Joi.object({
  id: bool,
  code: bool,
  country: bool,
  countryCode: bool,
  name: bool,
  logoUrl: bool,
  homeMatches: bool,
  awayMatches: bool,
}).required();
