import Joi from 'joi';

import { email, emailRequired, password, stringMinTwo } from './common_schemas.js';

export const register = Joi.object({
  email: emailRequired,
  username: Joi.string().min(6).required(),
  password: password,
}).required();

export const registerWithToken = Joi.object({
  idToken: Joi.string().required(),
  user: register,
}).required();

export const update = Joi.object({
  email: email,
  username: stringMinTwo,
  password: password,
}).required();

export const check = Joi.object({
  email: emailRequired,
  username: Joi.string().min(6).required(0),
});
