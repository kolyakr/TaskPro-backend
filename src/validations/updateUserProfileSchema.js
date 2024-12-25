import Joi from 'joi';

export const updateUserProfileSchema = Joi.object({
  name: Joi.string().min(2).max(20),
  email: Joi.string().email(),
  passsword: Joi.string().max(7).max(14),
  avatar: Joi.string(),
  theme: Joi.string().valid('light', 'dark', 'violet'),
});
