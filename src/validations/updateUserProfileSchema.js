import Joi from 'joi';

export const updateUserProfileSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  email: Joi.string().email(),
  password: Joi.string().min(7).max(14),
  avatar: Joi.object()
    .custom((value, helpers) => {
      if (!(value instanceof File)) {
        return helpers.error('any.invalid', { message: 'Invalid file type' });
      }
      return value;
    })
    .optional(),
  theme: Joi.string().valid('light', 'dark', 'violet'),
});
