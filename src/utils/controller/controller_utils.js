import { StatusCodes } from 'http-status-codes';
import * as errLib from '../../utils/errors/index.js';
import logger from '../../utils/logger.js';
export function handleResponse({ serviceRes, res, isCreate }) {
  if (serviceRes.success) {
    if (isCreate) {
      res.status(StatusCodes.CREATED).json(serviceRes.data);
    } else {
      if (!serviceRes.data) {
        res.status(StatusCodes.NOT_FOUND).json({ message: 'Resouce not found or unreachable' });
        return;
      }
      res.status(StatusCodes.OK).json(serviceRes.data);
    }
  } else {
    const err = handleError(serviceRes);
    res.status(err.statusCode).json(err.details);
  }
}

const handleError = (err, locale) => {
  const { layer: layer, level: level, code: code, meta: meta } = err;
  if (level === 'EXPECTED') {
    return {
      details: {
        message: errLib[locale ?? 'en'][layer][code],
        meta: meta,
      },
      statusCode: 400,
    };
  } else {
    logger.error(JSON.stringify(err));
    return {
      details: { message: errLib[locale ?? 'en'].INTERNAL },
      statusCode: 500,
    };
  }
};
export const handleInternalError = ({ req, res, err, locale }) => {
  const handledErr = handleError(
    {
      layer: 'INTERNAL',
      level: 'CRITICAL',
      details: {
        message: err.message,
        stack: err.stack,
      },
    },
    locale
  );
  res.status(handledErr.statusCode).json(handledErr.details);
};
