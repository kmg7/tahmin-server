const { dbClient: db, dbError } = require('../../utils/database');
const createstandings = async (standings) => {
  try {
    const standingsResponse = await db.standings.create({ data: standings });
    return { success: true, data: standingsResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getstandings = async (standingsId) => {
  try {
    const standingsResponse = await db.standings.findUnique({
      where: { id: standingsId },
    });
    return { success: true, data: standingsResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const updatestandings = async (standingsId, standings) => {
  try {
    const standingsResponse = await db.standings.update({
      where: { id: standingsId },
      data: standings,
    });

    return { success: true, data: standingsResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deletestandings = async (standingsId) => {
  try {
    const standingsResponse = await db.standings.delete({
      where: { id: standingsId },
    });
    return { success: true, data: standingsResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const getstandingses = async (standingsId) => {
  try {
    const standingsResponse = await db.standings.findMany({
      where: { id: { startsWith: standingsId } },
      orderBy: { dateTime: 'asc' },
    });
    return { success: true, data: standingsResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
const deletestandingses = async (standingsId) => {
  try {
    const standingsResponse = await db.standings.deleteMany({
      where: { id: { startsWith: id } },
    });
    return { success: true, data: standingsResponse };
  } catch (error) {
    return {
      success: false,
      error: dbError(error),
    };
  }
};
module.exports = {
  createstandings,
  getstandings,
  updatestandings,
  deletestandings,
  getstandingses,
  deletestandingses,
};
