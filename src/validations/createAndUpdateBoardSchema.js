import Joi from 'joi';

export const createAndUpdateBoardSchema = Joi.object({
  title: Joi.string().min(2).max(20).required(),
  icon: Joi.string().required(),
  background: Joi.string().required(),
});
