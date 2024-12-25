import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createBoardController,
  deleteBoardController,
  getBoardByIdController,
  getBoardsController,
  updateBoardController,
} from '../controllers/boards.js';
import { validateBody } from '../middlewares/validateBody.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { createAndUpdateBoardSchema } from '../validations/createAndUpdateBoardSchema.js';
import { authorization } from '../middlewares/authorization.js';

export const boardsRouter = Router();

boardsRouter.use('/:boardId', validateMongoId('boardId'));
boardsRouter.use(authorization);

boardsRouter.get('/', ctrlWrapper(getBoardsController));

boardsRouter.post(
  '/',
  validateBody(createAndUpdateBoardSchema),
  ctrlWrapper(createBoardController),
);

boardsRouter.get('/:boardId', ctrlWrapper(getBoardByIdController));

boardsRouter.delete('/:boardId', ctrlWrapper(deleteBoardController));

boardsRouter.patch(
  '/:boardId',
  validateBody(createAndUpdateBoardSchema),
  ctrlWrapper(updateBoardController),
);
