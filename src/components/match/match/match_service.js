const matchModel = require('./match_model');
const matchScoreModel = require('../../match_score/match_score_model');
//create match, matchscore, connect them to their stages update stage versions
const createMatch = async (data) => {
  try {
    //validate data
    const validate = validateMatch(data);
    if (!validate.valid) {
      return {
        success: false,
        error: validate.where,
      };
    }
    const matchResponse = await matchModel.createMatch(validate.data.match);
    if (!matchResponse.success) {
      return {
        success: false,
        error: matchResponse.error,
      };
    }
    const matchScoreResponse = await matchScoreModel.createMatchScore(validate.data.matchScore);
    if (!matchScoreResponse.success) {
      return {
        success: false,
        error: matchScoreResponse.error,
      };
    }
    //upsert matchScore
  } catch (error) {}
};
const validateMatch = (data) => {
  try {
    if (!data) {
      return {
        valid: false,
        where: 'data',
      };
    }
    if (!(data.id || data.stageId || data.date || data.homeTeamId || data.awayTeamId)) {
      return {
        valid: false,
        where: 'fields',
      };
    }
    if (data.id) {
    }
    validData = {
      match: {
        id: data.stageId + data.id,
        date: data.date,
        homeTeam: {
          connect: {
            id: data.homeTeamId,
          },
        },
        awayTeam: {
          connect: {
            id: data.awayTeamId,
          },
        },
        stage: {
          connect: {
            id: data.stageId,
          },
        },
      },
    };
    validData.matchScore = {
      id: 'MS' + data.stageId + data.id,
      stage: {
        connect: {
          id: 'MS' + data.stageId,
        },
      },
    };
    validData.valid = true;
    return validData;
  } catch (error) {
    console.log(error);
    return {
      valid: false,
      where: error,
    };
  }
};
