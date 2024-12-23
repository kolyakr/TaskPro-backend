import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  try {
    const { error, value } = await schema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      next(createHttpError(401, error.message));
    }

    next();
  } catch (err) {
    next(createHttpError(err));
  }
};
