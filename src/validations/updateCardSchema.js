import Joi from 'joi';

export const updateCardSchema = Joi.object({
  title: Joi.string().min(2).max(20),
  description: Joi.string().min(2).max(300),
  priority: Joi.string()
    .valid('without priority', 'low', 'medium', 'high')
    .default('without priority'),
  deadline: Joi.date(),
  columnId: Joi.string(),
});
