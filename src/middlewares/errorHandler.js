import { isHttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
    });
  }

  res.status(500).json({
    message: 'Internal Server Error',
  });
};
