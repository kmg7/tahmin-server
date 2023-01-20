import Joi from 'joi';
import { filterConditionsStandart, sortOrder, stringMinTwo, stringMinTwoRequired } from './common_schemas';

export const Create = Joi.object({
  id: Joi.string(),
  username: Joi.string().min(2).max(32).required(),
  standingsId: Joi.string().required(),
}).required();

export const CreateMany = Joi.array().items(Create).min(2).required();

export const Find = Joi.object({
  field: Joi.string().allow('id', 'standingsId_username').only().required(),
  value: Joi.when('field', {
    is: 'matchId_userId',
    then: Joi.object({
      standingsId: stringMinTwoRequired,
      username: stringMinTwoRequired,
    }),
    otherwise: stringMinTwoRequired,
  }),
}).required();

export const FindMany = Joi.object({
  field: Joi.string().allow('id').only().required(),
  value: Joi.array().items(Joi.string().min(2)).min(1).required(),
}).required();

export const Search = Joi.object({
  field: Joi.string().allow('id', 'username', 'standingsId').only().required(),
  condition: filterConditionsStandart,
  value: stringMinTwoRequired,
}).required();
// condition: Joi.string().allow('equals', 'not', 'in', 'lt', 'lte', 'gt', 'gte', 'contains', 'startswith', 'endswith').only(),

export const Update = Joi.object({
  id: stringMinTwo,
  username: stringMinTwo,
  standingsId: stringMinTwo,
}).required();

export const Upsert = Joi.array()
  .items(
    Joi.object({
      where: Find,
      update: Update,
      create: Create,
    })
  )
  .min(1)
  .required();

export const Sort = Joi.object({
  sortBy: Joi.string().allow('username', 'id', 'standingsId').only().required(),
  order: sortOrder,
}).required();

export const Select = Joi.object({
  id: bool,
  code: bool,
  name: bool,
  tournaments: bool,
  teams: bool,
  logoUrl: bool,
}).required();
