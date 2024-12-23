import Joi from 'joi';

export const createColumnSchema = Joi.object({
  title: Joi.string().min(1).max(20).required(),
  boardId: Joi.string().required(),
});
