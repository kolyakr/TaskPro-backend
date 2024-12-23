import Joi from 'joi';

export const updateColumnSchema = Joi.object({
  title: Joi.string().min(2).max(20).required(),
});
