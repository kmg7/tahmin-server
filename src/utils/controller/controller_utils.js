import { StatusCodes } from 'http-status-codes';

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
    res.status(serviceRes.statusCode).json(serviceRes.error);
  }
}
