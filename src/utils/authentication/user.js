const userService = require('../../components/user/user_service');
const updateUser = async (authId, user) => {
  const userResponse = await userService.getUser(authId);
  if (userResponse.success) {
    if (userResponse.data.authId == user.authId) {
      const updateResponse = await userService.updateUser(authId, user);
      return updateResponse;
    }
  }
};

const createUser = async (authId, user) => {
  const userResponse = await userService.createUser(authId);
  if (userResponse.success) {
    if (userResponse.data.authId == user.authId) {
      const updateResponse = await userService.updateUser(authId, user);
      return updateResponse;
    }
  }
};
