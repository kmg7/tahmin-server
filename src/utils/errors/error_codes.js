export const SERVICE = {
  'string.base': 'data_invalid_string',
  'string.empty': 'data_empty',
  'string.min': 'data_constraint_min',
  'string.max': 'data_constraint_max',
  'string.uri': 'data_invalid_uri',
  'string.isoDate': 'data_invalid_iso_date',
  'number.base': 'data_invalid_number',
  'number.integer': 'data_invalid_integer',
  'number.min': 'data_constraint_min',
  'number.max': 'data_constraint_max',
  'boolean.base': 'data_invalid_bool',
  'any.only': 'data_constraint_not_allowed',
  'any.required': 'data_required',
  'object.unknown': 'data_constraint_not_allowed',
};

export const DATABASE = {
  P2002: 'data_constraint_unique',
  P2003: 'data_constraint_foreign_key',
  P2025: 'data_not_found',
};

export const INTERNAL = 'server_internal';
export const AUTH = {
  'auth/id-token-expired': 'auth_token_expired',
  'auth/argument-error': 'auth_token_invalid',
  'auth/invalid-id-token': 'auth_token_invalid',
  'auth/revoked-id-token': 'auth_token_revoked',
  'auth/email-already-exists': 'auth_email_already_in_use',
  'auth/user-not-found': 'auth_user_not_found',
};

export const SERVER = {
  unauthorized: 'unauthorized',
};
