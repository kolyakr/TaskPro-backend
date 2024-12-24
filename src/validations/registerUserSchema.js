import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(14).required(),
  avatar: Joi.string(),
  theme: Joi.string().valid('light', 'dark', 'violet').required(),
});
