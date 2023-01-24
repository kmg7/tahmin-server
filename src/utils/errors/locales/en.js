export const SERVICE = {
  'string.base': 'Value must be string',
  'string.empty': 'Value cannot be empty',
  'string.min': 'Value cannot violate minimum character constraint',
  'string.max': 'Value cannot violate maximum character constraint',
  'string.uri': 'Value must be a valid uri',
  'string.isoDate': 'Value must be in iso format',
  'number.base': 'Value must be number',
  'number.integer': 'Value must be integer',
  'number.min': 'Value cannot violate minimum constraint',
  'number.max': 'Value cannot violate maximum constraint',
  'boolean.base': 'Value must be boolean',
  'any.only': 'Value must be one of allowed values',
  'any.required': 'Value required',
  'object.unknown': 'Value/Values not allowed',
};

export const DATABASE = {
  P2002: 'Unique constraint violation',
  P2003: 'Foreign key constraint failed',
  P2025: 'There are no such record, operation failed',
};

export const INTERNAL = 'Unexpected internal server error';

export const AUTH = {
  'auth/id-token-expired': 'Token expired',
  'auth/argument-error': 'Invalid JWT',
  'auth/invalid-id-token': 'Invalid token',
  'auth/revoked-id-token': 'Token revoked',
};
