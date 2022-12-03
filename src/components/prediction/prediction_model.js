const { dbClient: db, dbError } = require('../../utils/database');
const createprediction = async (prediction) => {
  try {
    const predictionResponse = await db.prediction.create({ data: prediction });
    return { success: true, data: predictionResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getprediction = async (predictionId) => {
  try {
    const predictionResponse = await db.prediction.findUnique({
      where: { id: predictionId },
    });
    return { success: true, data: predictionResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updateprediction = async (predictionId, prediction) => {
  try {
    const predictionResponse = await db.prediction.update({
      where: { id: predictionId },
      data: prediction,
    });

    return { success: true, data: predictionResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deleteprediction = async (predictionId) => {
  try {
    const predictionResponse = await db.prediction.delete({
      where: { id: predictionId },
    });
    return { success: true, data: predictionResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getpredictiones = async (predictionId) => {
  try {
    const predictionResponse = await db.prediction.findMany({
      where: { id: { startsWith: predictionId } },
      orderBy: { dateTime: 'asc' },
    });
    return { success: true, data: predictionResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deletepredictiones = async (predictionId) => {
  try {
    const predictionResponse = await db.prediction.deleteMany({
      where: { id: { startsWith: predictionId } },
    });
    return { success: true, data: predictionResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
module.exports = {
  createprediction,
  getprediction,
  updateprediction,
  deleteprediction,
  getpredictiones,
  deletepredictiones,
};
