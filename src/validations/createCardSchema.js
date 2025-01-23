import Joi from 'joi';

export const createCardSchema = Joi.object({
  title: Joi.string().min(2).max(50).required(),
  description: Joi.string().min(2).max(300).required(),
  priority: Joi.string()
    .valid('without priority', 'low', 'medium', 'high')
    .default('without priority')
    .required(),
  deadline: Joi.date().required(),
  columnId: Joi.string().required(),
});
