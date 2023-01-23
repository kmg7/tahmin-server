export const convertToArray = (input) => {
  try {
    const array = input.split(',');
    return array;
  } catch (error) {
    return false;
  }
};

export const handleError = (err) => {
  if (err.isJoi) {
    return {
      layer: 'SERVICE',
      level: 'EXPECTED',
      code: err.details[0].type ?? 'unknown',
      meta: err.details[0].path ?? 'unknown',
      details: err,
    };
  } else {
    return {
      layer: 'SERVICE',
      level: 'CRITICAL',
      code: 'internal',
      details: err,
    };
  }
};
