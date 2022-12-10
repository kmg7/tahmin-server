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
    console.log(response);
  } catch (error) {
    console.log(error);
  }
  return 1;
};

module.exports = { initializeAuthService, validateToken };
