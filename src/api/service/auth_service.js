import { productAdmin } from '../../utils/authentication/firebase_utils.js';
import { AuthManager } from '../../utils/authentication/auth_manager.js';
const authManager = new AuthManager({ firebaseAdmin: productAdmin });

export const register = async (data) => {
  const response = await authManager.register(data);
  return response;
};

export const registerWithToken = async (token) => {
  const response = await authManager.validateToken(token);
  return response;
};

export const update = async (uid, data) => {
  const response = await authManager.update(uid, data);
  return response;
};

export const remove = async (data) => {
  await authManager.remove(data);
};

export const isRegistered = async (data) => {
  const response = await authManager.isRegistered(data);
  return response;
};
