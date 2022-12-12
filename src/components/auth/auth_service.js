const { validateToken } = require('../../utils/authentication');
const register = async (data) => {
  const token = await validateToken({ token: data.token });
  if (!token.valid) {
    return {
      success: false,
      isToken: true,
      error: token.error,
    };
  }
  return await require('../user/user_service').createUser({
    user: {
      username: token.user.name,
      email: token.user.email,
      authId: token.user.uid,
    },
    select: {
      authId: true,
      username: true,
      email: true,
    },
  });
  //return success or error
};
const update = async (data) => {
  const token = await validateToken({ token: data.token });
  if (!token.valid) {
    return {
      success: false,
      error: token.error,
    };
  }
  return await require('../user/user_service').updateUser({
    user: {
      where: 'authId',
      value: token.user.uid,
    },
    update: {
      username: token.user.name,
      email: token.user.email,
    },
    select: {
      authId: true,
      username: true,
      email: true,
    },
  });
};
module.exports = {
  register,
  update,
};
