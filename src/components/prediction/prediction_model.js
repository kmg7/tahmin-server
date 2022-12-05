const { dbClient: db, dbError } = require('../../utils/database');
const createPrediction = async (prediction) => {
  try {
    const response = await db.prediction.create({
      data: prediction,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const createManyPrediction = async (predictions) => {
  try {
    const response = await db.prediction.createMany({
      data: predictions,
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getPrediction = async (predictionId) => {
  try {
    const response = await db.prediction.findUnique({
      where: {
        id: predictionId,
      },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updatePrediction = async (predictionId, prediction) => {
  try {
    const response = await db.prediction.update({
      where: { id: predictionId },
      data: prediction,
    });

    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const upsertManyPrediction = async (userId, predictions) => {
  try {
    const response = await db.$transaction(
      predictions.map((pred) =>
        db.prediction.upsert({
          where: { matchId_userId: { matchId: pred.matchId, userId: userId } },
          update: { awayScore: pred.awayScore, homeScore: pred.homeScore },
          create: { matchId: pred.matchId, userId: userId, homeScore: pred.homeScore, awayScore: pred.awayScore },
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
const deletePrediction = async (predictionId) => {
  try {
    const response = await db.prediction.delete({
      where: { id: predictionId },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const searchPrediction = async (matchId, userId) => {
  try {
    const response = await db.prediction.findMany({
      where: {
        AND: [{ matchId: { startsWith: matchId } }, { userId: userId }],
      },
      orderBy: { matchId: 'asc' },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getAllPredictions = async (matchId) => {
  try {
    const response = await db.prediction.findMany({
      where: {
        AND: [{ matchId: { startsWith: matchId } }],
      },
      orderBy: { matchId: 'asc' },
    });
    return { success: true, data: response };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteManyPrediction = async (predictionIds) => {
  try {
    const response = await db.prediction.deleteMany({
      where: { id: { in: predictionIds } },
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
  createPrediction,
  createManyPrediction,
  getPrediction,
  getAllPredictions,
  searchPrediction,
  updatePrediction,
  deletePrediction,
  deleteManyPrediction,
  upsertManyPrediction,
};
