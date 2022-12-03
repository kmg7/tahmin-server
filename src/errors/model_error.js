const fs = require('fs');
let errors;
const path = 'errors.json';
fs.readFile(path, (err, data) => {
  if (err) {
    console.log(err);
  }
  errors = JSON.parse(data);
});

const CUSTOM = (code, where, message) => {
  return {
    code: code,
    fields: where,
    message: message,
  };
};
const NOT_VALID = (fields, message, type) => {
  return {
    code: 'T1001',
    message: message,
    type: type,
    fields: fields,
  };
};
const NOT_PROVIDED = (fields) => {
  return {
    code: 'T1002',
    fields: fields,
    message: errors.T1002,
  };
};
const NOT_EXISTS = (fields) => {
  return {
    code: 'T1003',
    fields: fields,
    message: errors.T1003,
  };
};
const EXISTS = (fields) => {
  return {
    code: 'T1004',
    fields: fields,
    message: errors.T1004,
  };
};
module.exports = {
  CUSTOM,
  NOT_VALID,
  NOT_PROVIDED,
  NOT_EXISTS,
  EXISTS,
};
