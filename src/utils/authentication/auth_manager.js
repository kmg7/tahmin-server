import handleError from './error_handler.js';

export class AuthManager {
  #admin;
  constructor({ firebaseAdmin }) {
    this.#admin = firebaseAdmin.auth();
  }

  async validateToken(token) {
    try {
      const response = await this.#admin.verifyIdToken(token);
      const user = {
        id: response.uid,
        username: response.name,
        email: response.email,
      };
      return { valid: true, user: user };
    } catch (error) {
      return handleError(error);
    }
  }

  async register(data) {
    try {
      const user = await this.#admin.createUser(data);
      return { success: true, data: user };
    } catch (error) {
      return handleError(error);
    }
  }

  async update(uid, data) {
    try {
      const user = await this.#admin.updateUser(uid, data);
      return { success: true, data: user };
    } catch (error) {
      return handleError(error);
    }
  }

  async remove(uid) {
    try {
      await this.#admin.deleteUser(uid);
    } catch (error) {
      return handleError(error);
    }
  }
}
