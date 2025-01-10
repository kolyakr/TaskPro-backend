import { Router } from 'express';
import { boardsRouter } from './boards.js';
import { columnsRouter } from './columns.js';
import { cardsRouter } from './cards.js';
import { authRouter } from './auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { sendNeedHelpEmailController } from '../controllers/mail.js';
import { validateBody } from '../middlewares/validateBody.js';
import { sendNeedHelpEmailSchema } from '../validations/sendNeedHelpEmailSchema.js';
import { authorization } from '../middlewares/authorization.js';
import { usersRouter } from './users.js';

export const rootRouter = Router();

rootRouter.use('/boards', boardsRouter);

rootRouter.use('/columns', columnsRouter);

rootRouter.use('/cards', cardsRouter);

rootRouter.use('/auth', authRouter);

rootRouter.use('/me', usersRouter);

rootRouter.post(
  '/send-need-help-email',
  authorization,
  validateBody(sendNeedHelpEmailSchema),
  ctrlWrapper(sendNeedHelpEmailController),
);
