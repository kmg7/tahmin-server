import { StatusCodes } from 'http-status-codes';
import * as service from '../service/auth_service.js';
import * as moderatorSchemas from '../../utils/object_schemas/moderator_schemas.js';
import { ORMManager, Models } from '../../utils/database/sql/index.js';
import { ServiceManager } from '../../utils/service/service_manager.js';
import { handleError as serviceErrorHandler } from '../../utils/service/service_utils.js';
import * as schemas from '../../utils/object_schemas/auth_schemas.js';
import { handleInternalError, handleResponse } from '../../utils/controller/controller_utils.js';

const moderatorService = new ServiceManager({
  ormManager: new ORMManager({ model: Models.MODERATOR }),
  validationSchemas: moderatorSchemas,
});

export const register = async (req, res) => {
  try {
    try {
      await schemas.registerWithToken.validateAsync(req.body);
    } catch (error) {
      handleResponse({ res: res, serviceRes: serviceErrorHandler(error) });
      return;
    }
    const response = await service.registerWithToken(req.body.idToken);
    if (!response.valid) {
      handleResponse({ res: res, serviceRes: response });
      return;
    }
    let credentinals = req.body.user;
    credentinals.id = response.user.id;
    credentinals.email = response.user.email;
    const dbResponse = await moderatorService.create({
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
    const dbResponse = await moderatorService.update({
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
