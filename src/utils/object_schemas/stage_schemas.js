import Joi from 'joi';
import {
  stringMinTwo,
  stringMinTwoRequired,
  arrayStringMinTwoRequired,
  bool,
  sortOrder,
  filterConditionsStandart,
  boolRequired,
} from './common_schemas.js';

import { Search as MatchSearch, Sort as MatchSort, Select as MatchSelect } from './match_schemas.js';
import { Search as MatchScoreSearch, Sort as MatchScoreSort, Select as matchScoreSelect } from './match_score_schemas.js';

export const Create = Joi.object({
  id: stringMinTwoRequired,
  active: boolRequired,
  name: stringMinTwoRequired,
  tournamentId: stringMinTwoRequired,
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
  field: Joi.string().allow('id', 'tournamentId', 'userId', 'processed', 'createdAt', 'updatedAt').only().required(),
  condition: filterConditionsStandart,
  value: stringMinTwoRequired,
}).required();

export const Property = Joi.object({
  id: stringMinTwoRequired,
  prop: Joi.string().allow('matches', 'matchScores').only(),
  sort: Joi.when('prop', {
    is: 'matches',
    then: MatchSort,
    otherwise: MatchScoreSort,
  }),
  select: Joi.when('prop', {
    is: 'matchScores',
    then: MatchSelect,
    otherwise: matchScoreSelect,
  }),
});

export const PropertySearch = Joi.object({
  prop: Joi.string().allow('matches', 'matchScores').only(),
  search: Joi.when('prop', {
    is: 'matches',
    then: MatchSearch,
    otherwise: MatchScoreSearch,
  }),
});

export const Update = Joi.object({
  id: stringMinTwo,
  name: stringMinTwo,
  active: bool,
  tournamentId: stringMinTwo,
}).required();

export const Upsert = Joi.array()
  .items(Joi.object({ where: Find, update: Update, create: Create }))
  .min(1)
  .required();

export const Sort = Joi.object({
  sortBy: Joi.string().allow('name', 'id', 'tournamentId', 'active', 'createdAt', 'updatedAt').only().required(),
  order: sortOrder,
}).required();

export const Select = Joi.object({
  id: bool,
  active: bool,
  tournamentId: bool,
  name: bool,
  matches: bool,
  createdAt: bool,
  updatedAt: bool,
  matchScores: bool,
  tournament: bool,
}).required();
