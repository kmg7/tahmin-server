const modelError = require('../../errors/model_error');
const model = require('./user_model');
const Joi = require('joi');

const searchUser = async (data) => {
  try {
    await validateUsername(data.username);
    const response = await model.searchUser(data.username);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getAllUsers = async () => {
  try {
    const response = await model.getAllUsers();
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createUser = async (data) => {
  try {
    await validate(data.user);
    const response = await model.createUser(data.user);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const getUser = async (data) => {
  try {
    await validateUsername(data.username);
    const response = await model.getUser(data.username);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const updateUser = async (data) => {
  try {
    await validateUsername(data.username);
    await validate(data.user, false);
    const response = await model.updateUser(data.username, data.user);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteUser = async (data) => {
  try {
    await validateUsername(data.username);
    const response = await model.deleteUser(data.username);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const deleteManyUser = async (data) => {
  try {
    await validateUsernames(data.usernames);
    const response = await model.deleteManyUser(data.usernames);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const createManyUser = async (data) => {
  try {
    await validateMany(data.users);
    const response = await model.createManyUser(data.users);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};
const handleResponse = (response) => {
  if (!response.success) {
    return {
      success: false,
      error: response.error,
    };
  }
  return {
    success: true,
    data: response.data,
  };
};
const handleError = (error) => {
  if (error.isJoi) {
    return {
      success: false,
      error: modelError.NOT_VALID(error.details[0].path, error.details[0].message, error.details[0].type),
    };
  }
  return {
    success: false,
  };
};
const validate = async (user, iscreate = true) => {
  if (iscreate) {
    await userCreateSchema.validateAsync(user);
  } else {
    await userUpdateSchema.validateAsync(user);
  }
};
const validateMany = async (user) => {
  await userCreateManySchema.validateAsync(user);
};
const validateUsername = async (username) => {
  await usernameSchema.validateAsync(username);
};
const validateUsernames = async (usernames) => {
  await usernameArraySchema.validateAsync(usernames);
};
const usernameSchema = Joi.string().min(2).max(32).required();
const usernameArraySchema = Joi.array().items(usernameSchema).min(2).required();

const userCreateSchema = Joi.object({
  id: Joi.string(),
  authId: Joi.string().required(),
  username: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  id: Joi.string(),
  authId: Joi.string(),
  username: Joi.string().min(2).max(32),
  email: Joi.string().email(),
  password: Joi.string(),
});
const userCreateManySchema = Joi.array().items(userCreateSchema).min(2);

module.exports = {
  searchUser,
  getUser,
  getAllUsers,
  createUser,
  createManyUser,
  updateUser,
  deleteUser,
  deleteManyUser,
};
