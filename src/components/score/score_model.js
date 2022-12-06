const { dbClient: db, dbError } = require('../../utils/database');
const createScore = async (score) => {
  try {
    const response = await db.score.create({ data: score });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const createManyScore = async (score) => {
  try {
    const response = await db.score.createMany({ data: score });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getScore = async (scoreId) => {
  try {
    const response = await db.score.findUnique({
      where: { id: scoreId },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const searchScore = async (scoreId) => {
  try {
    const response = await db.score.findUnique({
      where: { id: scoreId },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updateScore = async (scoreId, score) => {
  try {
    const response = await db.score.update({
      where: { id: scoreId },
      data: score,
    });

    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteScore = async (scoreId) => {
  try {
    const response = await db.score.delete({
      where: { id: scoreId },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getAllScores = async (scoreId) => {
  try {
    const response = await db.score.findMany({
      where: { id: { startsWith: scoreId } },
      orderBy: { id: 'asc' },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteManyScore = async (scoreId) => {
  try {
    const response = await db.score.deleteMany({
      where: { id: { startsWith: id } },
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
  searchScore,
  getScore,
  getAllScores,
  createScore,
  createManyScore,
  updateScore,
  deleteScore,
  deleteManyScore,
};
