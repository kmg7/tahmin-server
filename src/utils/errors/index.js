import * as codes from './error_codes.js';

export const errorCodes = codes;

export const getCode = ({ layer, code }) => {
  if (!layer || layer == ErrorLayers.internal) return codes.INTERNAL;

  return codes[layer][code];
};

export const errorModel = ({ code, meta }) => {
  return {
    code: code,
    meta: meta,
  };
};

export const ErrorLevels = {
  expected: 'EXPECTED',
  critical: 'CRITICAL',
};

export const ErrorLayers = {
  internal: 'INTERNAL',
  database: 'DATABASE',
  service: 'SERVICE',
  auth: 'AUTH',
  server: 'SERVER',
};
