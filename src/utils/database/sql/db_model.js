import dbError from '../../utils/database/db_error_parser';

const create = async ({ model, data, select }) => {
  try {
    const response = await model.create({
      data: data,
      select: select,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const get = async ({ model, where, select }) => {
  try {
    const response = await model.findUnique({
      where: where,
      select: select,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const update = async ({ model, data, where, select }) => {
  try {
    const response = await model.update({
      where: where,
      data: data,
      select: select,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const remove = async ({ model, where, select }) => {
  try {
    const response = await model.delete({
      where: where,
      select: select,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const getMany = async ({ model, orderBy, select, where, skip, take }) => {
  try {
    const response = await model.findMany({
      skip: skip,
      take: take,
      where: where,
      orderBy: orderBy,
      select: select,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

const removeMany = async ({ model, where }) => {
  try {
    const response = await model.deleteMany({
      where: where,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const createMany = async ({ model, data, select }) => {
  try {
    const response = await model.createMany({
      data: data,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const upsertMany = async ({ model, data }) => {
  try {
    const response = await require('./db_client').$transaction(
      data.map((element) =>
        model.upsert({
          where: element.where,
          update: element.update,
          create: element.create,
        })
      )
    );
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};

export default {
  create,
  createMany,
  get,
  getMany,
  update,
  upsertMany,
  remove,
  removeMany,
};
