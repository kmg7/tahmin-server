import validator from 'validator';
const { isFloat, isInt } = validator;
const integer = (input) => {
  if (!input) {
    return false;
  } else {
    return isInt(input.toString());
  }
};

const float = (input) => {
  if (!input) {
    return false;
  } else {
    return isFloat(input.toString());
  }
};

const isString = (input) => {
  return typeof input === 'string' && Object.prototype.toString.call(input) === '[object String]';
};

const array = (input) => {
  return typeof input === 'object' && Object.prototype.toString.call(input) === '[object Array]';
};

export const validate = async (input) => {
  if (Array.isArray(input)) {
    for (const item of input) {
      await item.sch.validateAsync(item.obj);
    }
  } else {
    await input.sch.validateAsync(input.obj);
  }
};

export { array, float, isString, integer };
