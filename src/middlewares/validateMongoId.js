import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateMongoId = (id) => (req, res, next) => {
  const validateId = req.params[id];

  if (!isValidObjectId(validateId)) {
    next(createHttpError(401, 'Mongo id is invalid'));
  }

  next();
};
