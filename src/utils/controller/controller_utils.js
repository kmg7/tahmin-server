import { StatusCodes } from 'http-status-codes';
import { getCode, ErrorLevels, ErrorLayers } from '../../utils/errors/index.js';
import logger from '../../utils/logger.js';

export function handleResponse({ serviceRes, res, statusCode, errStatusCode }) {
  if (serviceRes.success || serviceRes.valid) {
    if (!serviceRes.data) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Resouce not found or unreachable' });
      return;
    }
    res.status(statusCode ?? StatusCodes.OK).json(serviceRes.data);
  } else {
    const err = handleError({ err: serviceRes, statusCode: errStatusCode });
    res.status(err.statusCode).json(err.details);
  }
}

export const handleError = ({ err, statusCode }) => {
  const { layer: layer, level: level, code: code, meta: meta } = err;
  if (level == ErrorLevels.expected) {
    return {
      details: {
        code: getCode({ layer: layer, code: code }),
        meta: meta,
      },
      statusCode: statusCode ?? 400,
    };
  } else {
    logger.error(JSON.stringify(err));
    return {
      details: { code: getCode({ layer: ErrorLayers.internal }) },
      statusCode: 500,
    };
  }
};

export const handleInternalError = ({ res, err }) => {
  const handledErr = handleError({
    err: {
      layer: ErrorLayers.internal,
      level: ErrorLevels.critical,
      details: {
        code: err.code,
        stack: err.stack,
      },
    },
  });

  res.status(handledErr.statusCode).json(handledErr.details);
};
