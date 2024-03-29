import dotenv from 'dotenv';
dotenv.config();

export const NODE_ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || 5000;
export const HOST = process.env.HOST || 'localhost';

export const PRODUCT_FIREBASE_ADMIN_PRIVATE_KEY = process.env.PRODUCT_FIREBASE_ADMIN_PRIVATE_KEY;
export const PRODUCT_FIREBASE_ADMIN_CLIENT_EMAIL = process.env.PRODUCT_FIREBASE_ADMIN_CLIENT_EMAIL;
export const PRODUCT_FIREBASE_ADMIN_PROJECT_ID = process.env.PRODUCT_FIREBASE_ADMIN_PROJECT_ID;
export const PRODUCT_FIREBASE_DATABASE_URL = process.env.PRODUCT_FIREBASE_DATABASE_URL;

export const MANAGEMENT_FIREBASE_ADMIN_PRIVATE_KEY = process.env.MANAGEMENT_FIREBASE_ADMIN_PRIVATE_KEY;
export const MANAGEMENT_FIREBASE_ADMIN_CLIENT_EMAIL = process.env.MANAGEMENT_FIREBASE_ADMIN_CLIENT_EMAIL;
export const MANAGEMENT_FIREBASE_ADMIN_PROJECT_ID = process.env.MANAGEMENT_FIREBASE_ADMIN_PROJECT_ID;
export const MANAGEMENT_FIREBASE_DATABASE_URL = process.env.MANAGEMENT_FIREBASE_DATABASE_URL;

export const DEV_AUTH_ID = process.env.DEV_AUTH_ID;
export const DEV_AUTH_NAME = process.env.DEV_AUTH_NAME;
export const DEV_AUTH_MAIL = process.env.DEV_AUTH_MAIL;

export const MONGO_URI = process.env.MONGO_URI;

// export const DATABASE_URL = process.env.DATABASE_URL;
