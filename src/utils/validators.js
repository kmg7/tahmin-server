const { isFloat, isInt, isISO8601 } = require('validator');

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
const string = (input) => {
  return typeof input === 'string' && Object.prototype.toString.call(input) === '[object String]';
};
const array = (input) => {
  return typeof input === 'object' && Object.prototype.toString.call(input) === '[object Array]';
};
module.exports = {
  array,
  float,
  string,
  integer,
};
