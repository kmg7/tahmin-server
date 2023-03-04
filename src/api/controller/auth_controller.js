import { StatusCodes } from 'http-status-codes';
import * as service from '../service/auth_service.js';
import * as userSchemas from '../../utils/object_schemas/user_schemas.js';
import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { handleError as serviceErrorHandler } from '../../utils/service/service_utils.js';
import * as schemas from '../../utils/object_schemas/auth_schemas.js';
import { handleInternalError, handleResponse } from '../../utils/controller/controller_utils.js';

const userService = new ServiceManager({
  ormManager: new ORMManager({ model: Models.USER }),
  validationSchemas: userSchemas,
});

export const register = async (req, res) => {
  try {
    const { token: token } = req.query;
    try {
      await schemas.registerWithToken.validateAsync({
        idToken: token,
        user: req.body,
      });
    } catch (error) {
      handleResponse({ res: res, serviceRes: serviceErrorHandler(error) });
      return;
    }
    const response = await service.registerWithToken(token);
    if (!response.valid) {
      handleResponse({ res: res, serviceRes: response });
      return;
    }
    let credentinals = req.body;
    credentinals.id = response.user.id;
    credentinals.email = response.user.email;
    const dbResponse = await userService.create({
      data: credentinals,
      select: { email: true, username: true },
    });
    if (!dbResponse.success) {
      handleResponse({ res: res, serviceRes: dbResponse });
      return;
    }
    const updateResponse = await service.update(credentinals.id, { displayName: credentinals.username });
    handleResponse({ res: res, serviceRes: updateResponse, statusCode: StatusCodes.CREATED });
  } catch (error) {
    handleInternalError({ err: error, res: res });
  }
};

export const update = async (req, res) => {
  try {
    const { id: id } = req.user;
    try {
      await schemas.update.validateAsync(req.body);
    } catch (error) {
      handleResponse({ res: res, serviceRes: serviceErrorHandler(error) });
      return;
    }
    const dbResponse = await userService.update({
      where: { field: 'id', value: id },
      data: req.body,
      select: { email: true, username: true },
    });
    if (!dbResponse.success) {
      handleResponse({ res: res, serviceRes: dbResponse });
      return;
    }
    const response = await service.update(id, req.body);
    handleResponse({ res: res, serviceRes: response });
  } catch (error) {
    handleInternalError({ err: error, res: res });
  }
};

export const check = async (req, res) => {
  try {
    try {
      await schemas.check.validateAsync(req.body);
    } catch (error) {
      handleResponse({ res: res, serviceRes: serviceErrorHandler(error) });
      return;
    }
    const isRegisteredEmailAuth = await service.isRegistered(req.body.email);
    if (!isRegisteredEmailAuth.notExists) {
      res.status(200).json({
        isRegistered: true,
        field: 'email',
        value: req.body.email,
      });
      return;
    }
    try {
      const isRegisteredEmailDb = await userService.get({ where: { field: 'email', value: req.body.email }, select: { email: true } });
      if (!(isRegisteredEmailDb.success && !isRegisteredEmailDb.data)) {
        res.status(200).json({
          isRegistered: true,
          field: 'email',
          value: req.body.email,
        });
        return;
      }
      const isRegisteredUsernameDb = await userService.get({
        where: { field: 'username', value: req.body.username },
        select: { username: true },
      });
      if (isRegisteredUsernameDb.success) {
        if (!isRegisteredUsernameDb.data) {
          res.status(200).json({
            isRegistered: false,
          });
          return;
        } else {
          res.status(200).json({
            isRegistered: true,
            field: 'username',
            value: req.body.username,
          });
          return;
        }
      }
      res.status(200).json({
        isRegistered: true,
      });
    } catch (error) {
      handleResponse({ res: res, serviceRes: serviceErrorHandler(error) });
    }
  } catch (error) {
    handleInternalError({ err: error, res: res });
  }
};
