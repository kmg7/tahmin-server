const modelError = require('../../errors/model_error');
const { dbModel, Models } = require('../../utils/database');
const user = Models.USER;
const Joi = require('joi');

const searchUser = async (data) => {
  try {
    await validate({ schema: userFindSchema, data: data, field: 'user' });
    await validate({ schema: userSortSchema, data: data, field: 'sort' });
    await validate({ schema: userSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: user,
        where: { [data.user.where]: { startsWith: data.user.value } },
        select: data.select,
        orderBy: { [data.sort.field]: data.sort.order },
        skip: data.pagination.skip,
        take: data.pagination.take,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const getAllUsers = async (data) => {
  try {
    await validate({ schema: userSortSchema, data: data, field: 'sort' });
    await validate({ schema: userSelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: user,
        select: data.select,
        orderBy: { [data.sort.field]: data.sort.order },
        skip: data.pagination.skip,
        take: data.pagination.take,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const createUser = async (data) => {
  try {
    await validate({ schema: userCreateSchema, data: data, field: 'user' });
    await validate({ schema: userSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.create({
        model: user,
        select: data.select,
        data: data.user,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const getUser = async (data) => {
  try {
    await validate({ schema: userFindSchema, data: data, field: 'user' });
    await validate({ schema: userSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.get({
        model: user,
        where: { [data.user.where]: data.user.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateUser = async (data) => {
  try {
    await validate({ schema: userFindSchema, data: data, field: 'user' });
    await validate({ schema: userSelectSchema, data: data, field: 'select' });
    await validate({ schema: userUpdateSchema, data: data, field: 'update' });
    return handleResponse(
      await dbModel.update({
        model: user,
        where: { [data.user.where]: data.user.value },
        data: data.update,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteUser = async (data) => {
  try {
    await validate({ schema: userFindSchema, data: data, field: 'user' });
    await validate({ schema: userSelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.remove({
        model: user,
        where: { [data.user.where]: data.user.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteManyUser = async (data) => {
  try {
    await validate({ schema: userFindManySchema, data: data, field: 'users' });
    return handleResponse(
      await dbModel.removeMany({
        model: user,
        where: { [data.users.where]: { in: data.users.values } },
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const createManyUser = async (data) => {
  try {
    await validate({ schema: userCreateManySchema, data: data, field: 'users' });
    return handleResponse(
      await dbModel.createMany({
        model: user,
        data: data.users,
        select: data.select,
      })
    );
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
  if (error.isValidation) {
    return {
      success: false,
      error: modelError.NOT_PROVIDED(error.meta),
    };
  }
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

const validate = async ({ schema, data, field }) => {
  if (!data[field]) {
    throw { isValidation: true, meta: `${field}` };
  }
  await schema.validateAsync(data[field]);
};

const paginationSchema = Joi.object({
  skip: Joi.number().integer().min(0),
  take: Joi.number().integer().min(5).max(100).required(),
});

const userSortSchema = Joi.object({
  field: Joi.string().allow('username', 'email', 'createdAt', 'updatedAt', 'role').required(),
  order: Joi.string().allow('asc', 'desc').required(),
}).required();

const userFindSchema = Joi.object({
  where: Joi.string().allow('username', 'email', 'authId', 'id').required(),
  value: Joi.string().min(2).required(),
}).required();

const userFindManySchema = Joi.object({
  where: Joi.string().allow('username', 'email', 'authId', 'id', 'role').required(),
  values: Joi.array().items(Joi.string().min(2)).min(1).required(),
});

const userSelectSchema = Joi.object({
  id: Joi.boolean(),
  authId: Joi.boolean(),
  role: Joi.boolean(),
  username: Joi.boolean(),
  email: Joi.boolean(),
  password: Joi.boolean(),
  createdAt: Joi.boolean(),
  updatedAt: Joi.boolean(),
  scores: Joi.boolean(),
  predictions: Joi.boolean(),
}).required();

const userCreateSchema = Joi.object({
  id: Joi.string(),
  authId: Joi.string().required(),
  role: Joi.string(),
  username: Joi.string().min(2).max(32).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const userUpdateSchema = Joi.object({
  id: Joi.string(),
  authId: Joi.string(),
  role: Joi.string(),
  username: Joi.string().min(2).max(32),
  email: Joi.string().email(),
  password: Joi.string(),
});

const userCreateManySchema = Joi.array().items(userCreateSchema).min(1);

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
