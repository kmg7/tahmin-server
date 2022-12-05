const { dbClient: db, dbError } = require('../../utils/database');
const createUser = async (user) => {
  try {
    const response = await db.user.create({ data: user });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getUser = async (username) => {
  try {
    const response = await db.user.findUnique({
      where: { username: username },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updateUser = async (username, user) => {
  try {
    const response = await db.user.update({
      where: { username: username },
      data: user,
    });

    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteUser = async (username) => {
  try {
    const response = await db.user.delete({
      where: { username: username },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const searchUser = async (username) => {
  try {
    const response = await db.user.findMany({
      where: { username: { startsWith: username } },
      orderBy: { username: 'asc' },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getAllUsers = async (username) => {
  try {
    const response = await db.user.findMany({
      where: { username: { startsWith: username } },
      orderBy: { username: 'asc' },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteManyUser = async (username) => {
  try {
    const response = await db.user.deleteMany({
      where: { username: { startsWith: id } },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const createManyUser = async (users) => {
  try {
    const response = await db.user.createMany({
      data: users,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
module.exports = {
  createManyUser,
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteManyUser,
  deleteUser,
};
