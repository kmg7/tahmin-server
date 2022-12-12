const admin = require('firebase-admin');
const initializeAuthService = () =>
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
const validateToken = async ({ token }) => {
  try {
    const response = await admin.auth().verifyIdToken(token);
    return {
      valid: true,
      user: response,
    };
  } catch (error) {
    return { valid: false, error: handleError(error) };
  }
};
const handleError = (error) => {
  if (error.code === 'auth/id-token-expired') {
    return {
      code: 401,
      message: 'Token expired',
    };
  }
  if (error.code === 'auth/argument-error') {
    return {
      code: 400,
      message: 'Invalid JWT',
    };
  }
  if (error.code === 'auth/invalid-id-token') {
    return {
      code: 401,
      message: 'Invalid token',
    };
  }
  if (error.code === 'auth/revoked-id-token') {
    return {
      code: 401,
      message: 'Token revoked',
    };
  }
  console.log(error);
  return {
    code: 500,
    message: 'Unexpected internal error',
  };
};

module.exports = { initializeAuthService, validateToken };
