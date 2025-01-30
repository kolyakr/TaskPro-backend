import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createBoardController,
  deleteBoardController,
  getBoardsController,
  updateBoardController,
} from '../controllers/boards.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { authorization } from '../middlewares/authorization.js';
import { createBoardSchema } from '../validations/createBoardSchema.js';
import { updateBoardSchema } from '../validations/updateBoardSchema.js';

export const boardsRouter = Router();

boardsRouter.use('/:boardId', validateMongoId('boardId'));
boardsRouter.use(authorization);

boardsRouter.get('/', ctrlWrapper(getBoardsController));

boardsRouter.post(
  '/',
  validateBody(createBoardSchema),
  ctrlWrapper(createBoardController),
);

boardsRouter.delete('/:boardId', ctrlWrapper(deleteBoardController));

boardsRouter.patch(
  '/:boardId',
  validateBody(updateBoardSchema),
  ctrlWrapper(updateBoardController),
);
