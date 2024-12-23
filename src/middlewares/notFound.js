import createHttpError from 'http-errors';

export const notFound = (req, res, next) => {
  next(createHttpError(404, 'Oops, this route not found'));
};
