import Joi from 'joi';

export const sendNeedHelpEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  comment: Joi.string().max(100).required(),
});
