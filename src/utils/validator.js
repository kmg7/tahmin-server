import validator from 'validator';
const { isFloat, isInt, isJSON } = validator;
export const integer = (input) => {
  if (!input) {
    return false;
  } else {
    return isInt(input.toString());
  }
};

export const float = (input) => {
  if (!input) {
    return false;
  } else {
    return isFloat(input.toString());
  }
};

export const isString = (input) => {
  return typeof input === 'string' && Object.prototype.toString.call(input) === '[object String]';
};

export const array = (input) => {
  return typeof input === 'object' && Object.prototype.toString.call(input) === '[object Array]';
};

export const isJson = (input) => isJSON(input);

export const validate = async (input) => {
  if (Array.isArray(input)) {
    for (const item of input) {
      await item.sch.validateAsync(item.obj);
    }
  } else {
    await input.sch.validateAsync(input.obj);
  }
};
