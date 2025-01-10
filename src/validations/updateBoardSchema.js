import Joi from 'joi';

export const updateBoardSchema = Joi.object({
  title: Joi.string().min(2).max(20),
  icon: Joi.string(),
  background: Joi.string(),
});
