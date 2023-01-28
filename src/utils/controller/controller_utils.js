import { StatusCodes } from 'http-status-codes';
import { getMessage, ErrorLevels, ErrorLayers } from '../../utils/errors/index.js';
import logger from '../../utils/logger.js';

export function handleResponse({ serviceRes, res, statusCode, errStatusCode, locale }) {
  if (serviceRes.success || serviceRes.valid) {
    if (!serviceRes.data) {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Resouce not found or unreachable' });
      return;
    }
    res.status(statusCode ?? StatusCodes.OK).json(serviceRes.data);
  } else {
    const err = handleError({ err: serviceRes, statusCode: errStatusCode, locale: locale });
    res.status(err.statusCode).json(err.details);
  }
}

export const handleError = ({ err, locale, statusCode }) => {
  const { layer: layer, level: level, code: code, meta: meta } = err;
  if (level == ErrorLevels.expected) {
    return {
      details: {
        message: getMessage({ layer: layer, code: code, locale: locale }),
        meta: meta,
      },
      statusCode: statusCode ?? 400,
    };
  } else {
    logger.error(JSON.stringify(err));
    return {
      details: { message: getMessage({ layer: ErrorLayers.internal, locale: locale }) },
      statusCode: 500,
    };
  }
};

export const handleInternalError = ({ res, err, locale }) => {
  const handledErr = handleError({
    err: {
      layer: ErrorLayers.internal,
      level: ErrorLevels.critical,
      details: {
        message: err.message,
        stack: err.stack,
      },
    },
    locale: locale,
  });

  res.status(handledErr.statusCode).json(handledErr.details);
};
