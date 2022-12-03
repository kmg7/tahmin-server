const { dbClient: db, dbError } = require('../../utils/database');
const createscore = async (score) => {
  try {
    const scoreResponse = await db.score.create({ data: score });
    return { success: true, data: scoreResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getscore = async (scoreId) => {
  try {
    const scoreResponse = await db.score.findUnique({
      where: { id: scoreId },
    });
    return { success: true, data: scoreResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updatescore = async (scoreId, score) => {
  try {
    const scoreResponse = await db.score.update({
      where: { id: scoreId },
      data: score,
    });

    return { success: true, data: scoreResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deletescore = async (scoreId) => {
  try {
    const scoreResponse = await db.score.delete({
      where: { id: scoreId },
    });
    return { success: true, data: scoreResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getscorees = async (scoreId) => {
  try {
    const scoreResponse = await db.score.findMany({
      where: { id: { startsWith: scoreId } },
      orderBy: { dateTime: 'asc' },
    });
    return { success: true, data: scoreResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deletescorees = async (scoreId) => {
  try {
    const scoreResponse = await db.score.deleteMany({
      where: { id: { startsWith: id } },
    });
    return { success: true, data: scoreResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
module.exports = {
  createscore,
  getscore,
  updatescore,
  deletescore,
  getscorees,
  deletescorees,
};
