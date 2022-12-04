const { dbClient: db, dbError } = require('../../../utils/database');
const createMatch = async (match) => {
  try {
    const response = await db.match.create({
      data: match,
    });
    return { success: true, data: response };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getMatch = async (matchId) => {
  try {
    const response = await db.match.findUnique({
      where: { id: matchId },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updateMatch = async (matchId, match) => {
  try {
    const response = await db.match.update({
      where: { id: matchId },
      data: match,
    });

    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteMatch = async (matchId) => {
  try {
    const response = await db.match.delete({
      where: { id: matchId },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const searchMatch = async (matchId) => {
  try {
    const response = await db.match.findMany({
      where: { id: { startsWith: matchId } },
      orderBy: { dateTime: 'asc' },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getAllMatches = async () => {
  try {
    const response = await db.match.findMany({
      orderBy: { dateTime: 'asc' },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteManyMatch = async (ids) => {
  try {
    const response = await db.match.deleteMany({
      where: { id: { in: ids } },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const createManyMatch = async (matches) => {
  try {
    const response = await db.match.createMany({ data: matches });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
module.exports = {
  createMatch,
  createManyMatch,
  getMatch,
  getAllMatches,
  updateMatch,
  deleteMatch,
  deleteManyMatch,
  searchMatch,
};
