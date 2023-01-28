import admin from 'firebase-admin';
import logger from '../logger.js';
import {
  MANAGEMENT_FIREBASE_ADMIN_PRIVATE_KEY,
  MANAGEMENT_FIREBASE_ADMIN_CLIENT_EMAIL,
  MANAGEMENT_FIREBASE_ADMIN_PROJECT_ID,
  MANAGEMENT_FIREBASE_DATABASE_URL,
  PRODUCT_FIREBASE_ADMIN_PRIVATE_KEY,
  PRODUCT_FIREBASE_ADMIN_CLIENT_EMAIL,
  PRODUCT_FIREBASE_ADMIN_PROJECT_ID,
  PRODUCT_FIREBASE_DATABASE_URL,
} from '../../config.js';

export const managementAdmin = admin.initializeApp({
  credential: admin.credential.cert({
    private_key: MANAGEMENT_FIREBASE_ADMIN_PRIVATE_KEY,
    client_email: MANAGEMENT_FIREBASE_ADMIN_CLIENT_EMAIL,
    project_id: MANAGEMENT_FIREBASE_ADMIN_PROJECT_ID,
  }),
  databaseURL: MANAGEMENT_FIREBASE_DATABASE_URL,
});

logger.info(`Firebase Service initialized (management)`);

export const productAdmin = admin.initializeApp(
  {
    credential: admin.credential.cert({
      private_key: PRODUCT_FIREBASE_ADMIN_PRIVATE_KEY,
      client_email: PRODUCT_FIREBASE_ADMIN_CLIENT_EMAIL,
      project_id: PRODUCT_FIREBASE_ADMIN_PROJECT_ID,
    }),
    databaseURL: PRODUCT_FIREBASE_DATABASE_URL,
  },
  'product'
);
logger.info(`Firebase Service initialized (product)`);

// const initializeFirebaseServices = ({ name, private_key, client_email, project_id, databaseURL }) => {
//   try {
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         private_key: MANAGEMENT_FIREBASE_ADMIN_PRIVATE_KEY,
//         client_email: MANAGEMENT_FIREBASE_ADMIN_CLIENT_EMAIL,
//         project_id: MANAGEMENT_FIREBASE_ADMIN_PROJECT_ID,
//       }),
//       databaseURL: MANAGEMENT_FIREBASE_DATABASE_URL,
//     });
//     logger.info(`Firebase Service initialized (management)`);
//     admin.initializeApp(
//       {
//         credential: admin.credential.cert({
//           private_key: PRODUCT_FIREBASE_ADMIN_PRIVATE_KEY,
//           client_email: PRODUCT_FIREBASE_ADMIN_CLIENT_EMAIL,
//           project_id: PRODUCT_FIREBASE_ADMIN_PROJECT_ID,
//         }),
//         databaseURL: PRODUCT_FIREBASE_DATABASE_URL,
//       },
//       'product'
//     );
//     logger.info(`Firebase Service initialized (product)`);
//   } catch (error) {
//     logger.error(error);
//   }
// };

// export const managementAdmin = initializeFirebaseAdmin({
//   name: 'management',
//   private_key: MANAGEMENT_FIREBASE_ADMIN_PRIVATE_KEY,
//   client_email: MANAGEMENT_FIREBASE_ADMIN_CLIENT_EMAIL,
//   project_id: MANAGEMENT_FIREBASE_ADMIN_PROJECT_ID,
//   databaseURL: MANAGEMENT_FIREBASE_DATABASE_URL,
// });

// export const productAdmin = initializeFirebaseAdmin({
//   private_key: PRODUCT_FIREBASE_ADMIN_PRIVATE_KEY,
//   client_email: PRODUCT_FIREBASE_ADMIN_CLIENT_EMAIL,
//   project_id: PRODUCT_FIREBASE_ADMIN_PROJECT_ID,
//   databaseURL: PRODUCT_FIREBASE_DATABASE_URL,
// });
