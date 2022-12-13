const { dbModel, Models } = require('../../utils/database');
const modelError = require('../../errors/model_error');
const country = Models.COUNTRY;
const Joi = require('joi');

const searchCountry = async (data) => {
  try {
    await validate({ schema: countryFindSchema, data: data, field: 'country' });
    await validate({ schema: countrySortSchema, data: data, field: 'sort' });
    await validate({ schema: countrySelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: country,
        where: { [data.country.where]: { startsWith: data.country.value } },
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

const getAllCountries = async (data) => {
  try {
    await validate({ schema: countrySortSchema, data: data, field: 'sort' });
    await validate({ schema: countrySelectSchema, data: data, field: 'select' });
    await validate({ schema: paginationSchema, data: data, field: 'pagination' });
    return handleResponse(
      await dbModel.getMany({
        model: country,
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

const createCountry = async (data) => {
  try {
    await validate({ schema: countryCreateSchema, data: data, field: 'country' });
    await validate({ schema: countrySelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.create({
        model: country,
        data: data.country,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const getCountry = async (data) => {
  try {
    await validate({ schema: countryFindSchema, data: data, field: 'country' });
    await validate({ schema: countrySelectSchema, data: data, field: 'select' });
    return handleResponse(
      await dbModel.get({
        model: country,
        where: { [data.country.where]: data.country.value },
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const updateCountry = async (data) => {
  try {
    await validate({ schema: countryFindSchema, data: data, field: 'country' });
    await validate({ schema: countrySelectSchema, data: data, field: 'select' });
    await validate({ schema: countryUpdateSchema, data: data, field: 'update' });
    return handleResponse(
      await dbModel.update({
        model: country,
        where: { [data.country.where]: data.country.value },
        data: data.update,
        select: data.select,
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const deleteCountry = async (data) => {
  try {
    await validate({ schema: countryFindSchema, data: data, field: 'country' });
    await validate({ schema: countrySelectSchema, data: data, field: 'select' });
    const response = await dbModel.remove({
      model: country,
      where: { [data.country.where]: data.country.value },
      select: data.select,
    });
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

const deleteManyCountry = async (data) => {
  try {
    await validate({ schema: countryFindManySchema, data: data, field: 'countrys' });
    return handleResponse(
      await dbModel.removeMany({
        model: country,
        where: { [data.countrys.where]: { in: data.countrys.values } },
      })
    );
  } catch (error) {
    return handleError(error);
  }
};

const createManyCountry = async (data) => {
  try {
    await validate({ schema: countryCreateManySchema, data: data, field: 'countrys' });
    return handleResponse(
      await dbModel.createMany({
        model: country,
        data: data.countrys,
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
  console.log(error);
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
}).required();

const countrySortSchema = Joi.object({
  field: Joi.string().allow('id', 'name', 'code').required(),
  order: Joi.string().allow('asc', 'desc').required(),
}).required();

const countryFindSchema = Joi.object({
  where: Joi.string().allow('id', 'code').required(),
  value: Joi.string().min(2).required(),
}).required();

const countryFindManySchema = Joi.object({
  where: Joi.string().allow('id', 'code').required(),
  values: Joi.array().items(Joi.string().min(2)).min(1).required(),
}).required();

const countrySelectSchema = Joi.object({
  id: Joi.boolean(),
  code: Joi.boolean(),
  name: Joi.boolean(),
  tournaments: Joi.boolean(),
  teams: Joi.boolean(),
  logoUrl: Joi.boolean(),
}).required();

const countryCreateSchema = Joi.object({
  id: Joi.string().required(),
  code: Joi.string().required(),
  name: Joi.string().min(2).max(32).required(),
  logoUrl: Joi.string().required(),
}).required();

const countryUpdateSchema = Joi.object({
  id: Joi.string(),
  code: Joi.string(),
  countryCode: Joi.string(),
  name: Joi.string().min(2).max(32),
  logoUrl: Joi.string(),
}).required();

const countryCreateManySchema = Joi.array().items(countryCreateSchema).min(2).required();

module.exports = {
  searchCountry,
  getCountry,
  getAllCountries,
  createCountry,
  createManyCountry,
  updateCountry,
  deleteCountry,
  deleteManyCountry,
};
