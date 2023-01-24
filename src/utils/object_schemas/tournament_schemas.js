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
  boolRequired,
  date,
} from './common_schemas.js';

import { Search as StandingsSearch, Sort as StandingsSort, Select as StandingsSelect } from './standings_schemas.js';
import { Search as StageSearch, Sort as StageSort, Select as StageSelect } from './stage_schemas.js';

export const Create = Joi.object({
  id: stringMinTwo,
  name: stringMinTwoRequired,
  countryCode: stringMinTwoRequired,
  active: boolRequired,
  code: stringMinTwoRequired,
  logoUrl: urlRequired,
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
  field: Joi.string().allow('countryCode', 'id', 'active', 'name', 'code', 'createdAt', 'updatedAt').only().required(),
  condition: filterConditionsStandart,
  value: Joi.when('where', {
    switch: [
      { is: 'active', then: bool },
      { is: 'createdAt', then: date },
      { is: 'updatedAt', then: date, otherwise: stringMinTwo },
    ],
  }).required(),
}).required();

export const Property = Joi.object({
  id: stringMinTwoRequired,
  prop: Joi.string().allow('stages', 'standings').only(),
  sort: Joi.when('prop', {
    is: 'stages',
    then: StageSort,
    otherwise: StandingsSort,
  }),
  select: Joi.when('prop', {
    is: 'stages',
    then: StageSelect,
    otherwise: StandingsSelect,
  }),
});

export const PropertySearch = Joi.object({
  prop: Joi.string().allow('stages', 'standings').only(),
  search: Joi.when('prop', {
    is: 'stages',
    then: StageSearch,
    otherwise: StandingsSearch,
  }),
});

export const Update = Joi.object({
  id: stringMinTwo,
  name: stringMinTwo,
  countryCode: stringMinTwo,
  active: bool,
  code: stringMinTwo,
  logoUrl: url,
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
  sortBy: Joi.string().allow('countryCode', 'id', 'active', 'name', 'code', 'createdAt', 'updatedAt').only().required(),
  order: sortOrder,
}).required();

export const Select = Joi.object({
  id: bool,
  name: bool,
  countryCode: bool,
  active: bool,
  code: bool,
  logoUrl: bool,
  createdAt: bool,
  updatedAt: bool,
  stages: bool,
  standings: bool,
  country: bool,
}).required();
