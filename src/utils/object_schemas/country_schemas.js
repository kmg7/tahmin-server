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

import { Search as TeamSearch, Sort as TeamSort, Select as TeamSelect } from './team_schemas.js';
import { Search as TournamentSearch, Sort as TournamentSort, Select as TournamentSelect } from './tournament_schemas.js';

export const Create = Joi.object({
  id: stringMinTwoRequired,
  code: stringMinTwoRequired,
  name: stringMinTwoRequired,
  logoUrl: urlRequired,
}).required();

export const CreateMany = Joi.array().items(Create).min(2).required();

export const Find = Joi.object({
  field: Joi.string().allow('id', 'code').only().required(),
  value: stringMinTwoRequired,
}).required();

export const FindMany = Joi.object({
  field: Joi.string().allow('id', 'code').only().required(),
  value: arrayStringMinTwoRequired,
}).required();

export const Search = Joi.object({
  field: Joi.string().allow('id', 'code', 'name').only().required(),
  condition: filterConditionsStandart,
  value: stringMinTwoRequired,
}).required();

export const Property = Joi.object({
  id: stringMinTwoRequired,
  prop: Joi.string().allow('tournaments', 'teams').only(),
  sort: Joi.when('prop', {
    is: 'teams',
    then: TeamSort,
    otherwise: TournamentSort,
  }),
  select: Joi.when('prop', {
    is: 'teams',
    then: TeamSelect,
    otherwise: TournamentSelect,
  }),
});

export const PropertySearch = Joi.object({
  prop: Joi.string().allow('tournaments', 'teams').only(),
  search: Joi.when('prop', {
    is: 'teams',
    then: TeamSearch,
    otherwise: TournamentSearch,
  }),
});

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
  sortBy: Joi.string().allow('id', 'name', 'code').only().required(),
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
