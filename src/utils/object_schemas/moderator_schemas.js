import Joi from 'joi';

import {
  stringMinTwo,
  stringMinTwoRequired,
  arrayStringMinTwoRequired,
  bool,
  sortOrder,
  email,
  emailRequired,
  filterConditionsStandart,
  url,
} from './common_schemas.js';

import { Search as authoritySearch, Sort as authoritySort, Select as authoritySelect } from './authority_schemas.js';

export const Create = Joi.object({
  id: stringMinTwo,
  username: stringMinTwoRequired,
  phoneNumber: stringMinTwo,
  photoUrl: url,
  email: emailRequired,
  password: stringMinTwo,
}).required();

export const CreateMany = Joi.array().items(Create).min(2).required();

export const Find = Joi.object({
  field: Joi.string().allow('username', 'email', 'id').only().required(),
  value: stringMinTwoRequired,
}).required();

export const FindMany = Joi.object({
  field: Joi.string().allow('username', 'email', 'id').only().required(),
  value: arrayStringMinTwoRequired,
}).required();

export const Search = Joi.object({
  field: Joi.string().allow('username', 'email', 'id', 'createdAt', 'updatedAt', 'phoneNumber', 'role').only().required(),
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
  username: stringMinTwo,
  photoUrl: url,
  email: email,
  role: stringMinTwo,
  verified: bool,
  password: stringMinTwo,
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
  authoritys: bool,
}).required();
