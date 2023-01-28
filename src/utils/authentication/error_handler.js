const expected = [
  'auth/id-token-expired',
  'auth/argument-error',
  'auth/invalid-id-token',
  'auth/revoked-id-token',
  'auth/email-already-exists',
  'auth/user-not-found',
];

export default (error) => {
  return {
    layer: 'AUTH',
    level: expected.includes(error.code) ? 'EXPECTED' : 'CRITICAL',
    code: error.code,
    details: error,
  };
};
