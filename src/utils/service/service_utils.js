export const convertToArray = (input) => {
  try {
    const array = input.split(',');
    return array;
  } catch (error) {
    return false;
  }
};

export const handleError = ({ error, errorLib }) => {
  //TODO noProduction
  console.log(error);
  if (error.isNotProvided) {
    return {
      success: false,
      statusCode: 400,
      error: errorLib.NOT_PROVIDED(error.meta),
    };
  }
  if (error.isJoi) {
    return {
      success: false,
      statusCode: 400,
      error: errorLib.NOT_VALID(error.details[0].path, error.details[0].message, error.details[0].type),
    };
  }
  return {
    success: false,
    statusCode: 500,
    error: { message: 'Internal server error' },
  };
};
