import Joi from 'joi';

//TODO arrange min max values for standart string inputs
export const integerPositive = Joi.number().integer().min(0);

export const integerPositiveRequired = Joi.number().integer().min(0);

export const stringMinTwo = Joi.string().min(2).max(32);

export const stringMinTwoRequired = stringMinTwo.required();

export const arrayStringMinTwoRequired = Joi.array().items(stringMinTwo).required();

export const bool = Joi.boolean();

export const boolRequired = bool.required();

export const sortOrder = Joi.string().allow('asc', 'desc').only().required();

export const date = Joi.string().isoDate();

export const dateRequired = date.required();

export const url = Joi.string().uri();

export const urlRequired = url.required();

export const pagination = Joi.object({
  skip: Joi.number().integer().min(0),
  take: Joi.number().integer().min(5).max(100).required(),
}).required();

// condition: Joi.string().allow('equals', 'not', 'in', 'lt', 'lte', 'gt', 'gte', 'contains', 'startswith', 'endswith').only(),
export const filterConditionsStandart = Joi.string().allow('equals', 'contains', 'startsWith', 'endsWith').only().required();
