import Joi from 'joi';

import {
  stringMinTwo,
  stringMinTwoRequired,
  arrayStringMinTwoRequired,
  bool,
  sortOrder,
  filterConditionsStandart,
} from './common_schemas.js';

import { Search as authoritySearch, Sort as authoritySort, Select as authoritySelect } from './authority_schemas.js';

export const Create = Joi.object({
  id: stringMinTwoRequired,
  name: stringMinTwoRequired,
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
  field: Joi.string().allow('id', 'name').only().required(),
  condition: filterConditionsStandart,
  value: stringMinTwoRequired,
}).required();

export const Property = Joi.object({
  id: stringMinTwoRequired,
  prop: Joi.string().allow('authorizations').only(),
  sort: Joi.when('prop', {
    is: 'authorizations',
    then: authoritySort,
    otherwise: authoritySort,
  }),
  select: Joi.when('prop', {
    is: 'authorizations',
    then: authoritySelect,
    otherwise: authoritySelect,
  }),
});

export const PropertySearch = Joi.object({
  prop: Joi.string().allow('authorizations').only(),
  search: Joi.when('prop', {
    is: 'authorizations',
    then: authoritySearch,
    otherwise: authoritySearch,
  }),
});

export const Update = Joi.object({
  id: stringMinTwo,
  name: stringMinTwo,
}).required();

export const Upsert = Joi.array()
  .items(Joi.object({ where: Find, update: Update, create: Create }))
  .min(1)
  .required();

export const Sort = Joi.object({
  sortBy: Joi.string().allow('id', 'name').only().required(),
  order: sortOrder,
}).required();

export const Select = Joi.object({
  id: bool,
  name: bool,
  authorizations: bool,
}).required();
