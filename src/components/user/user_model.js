const { dbClient: db, dbError } = require('../../utils/database');
const createuser = async (user) => {
  try {
    const userResponse = await db.user.create({ data: user });
    return { success: true, data: userResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getuser = async (userId) => {
  try {
    const userResponse = await db.user.findUnique({
      where: { id: userId },
    });
    return { success: true, data: userResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updateuser = async (userId, user) => {
  try {
    const userResponse = await db.user.update({
      where: { id: userId },
      data: user,
    });

    return { success: true, data: userResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteuser = async (userId) => {
  try {
    const userResponse = await db.user.delete({
      where: { id: userId },
    });
    return { success: true, data: userResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getuseres = async (userId) => {
  try {
    const userResponse = await db.user.findMany({
      where: { id: { startsWith: userId } },
      orderBy: { dateTime: 'asc' },
    });
    return { success: true, data: userResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteuseres = async (userId) => {
  try {
    const userResponse = await db.user.deleteMany({
      where: { id: { startsWith: id } },
    });
    return { success: true, data: userResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
module.exports = {
  createuser,
  getuser,
  updateuser,
  deleteuser,
  getuseres,
  deleteuseres,
};
