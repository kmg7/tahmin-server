const admin = require('firebase-admin');
const logger = require('../logger');
const checkPermissions = require('./check_permissions');
const initializeAuthService = () => {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        private_key:
          process.env.FIREBASE_ADMIN_PRIVATE_KEY[0] === '-'
            ? process.env.FIREBASE_ADMIN_PRIVATE_KEY
            : JSON.parse(process.env.FIREBASE_ADMIN_PRIVATE_KEY),
        client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    logger.info('Authentication Service initialized');
  } catch (error) {
    logger.error(error);
  }
};
const validateToken = async ({ token }) => {
  try {
    const response = await admin.auth().verifyIdToken(token);
    const isSU = process.env.SUPERUSERS.includes(response.uid);
    const user = {
      authId: response.uid,
      username: response.name,
      email: response.email,
      isSU: isSU,
    };
    return { valid: true, user: user };
  } catch (error) {
    return { valid: false, error: handleError(error) };
  }
};
const handleError = (error) => {
  if (error.code === 'auth/id-token-expired') {
    return {
      isToken: true,
      code: 401,
      message: 'Token expired',
    };
  }
  if (error.code === 'auth/argument-error') {
    return {
      isToken: true,
      code: 400,
      message: 'Invalid JWT',
    };
  }
  if (error.code === 'auth/invalid-id-token') {
    return {
      isToken: true,
      code: 401,
      message: 'Invalid token',
    };
  }
  if (error.code === 'auth/revoked-id-token') {
    return {
      isToken: true,
      code: 401,
      message: 'Token revoked',
    };
  }
  logger.warn(error);
  return {
    isToken: true,
    code: 500,
    message: 'Unexpected internal error',
  };
};

module.exports = { initializeAuthService, validateToken, checkPermissions };
