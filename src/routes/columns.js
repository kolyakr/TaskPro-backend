import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  createColumnController,
  deleteColumnController,
  getColumnByIdController,
  getColumnsController,
  updateColumnController,
} from '../controllers/columns.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createColumnSchema } from '../validations/createColumnSchema.js';
import { updateColumnSchema } from '../validations/updateColumnSchema.js';
import { authorization } from '../middlewares/authorization.js';

export const columnsRouter = Router();
columnsRouter.use('/:columnId', validateMongoId('columnId'));
columnsRouter.use(authorization);

columnsRouter.get('/', ctrlWrapper(getColumnsController));

columnsRouter.get('/:columnId', ctrlWrapper(getColumnByIdController));

columnsRouter.post(
  '/',
  validateBody(createColumnSchema),
  ctrlWrapper(createColumnController),
);

columnsRouter.delete('/:columnId', ctrlWrapper(deleteColumnController));

columnsRouter.patch(
  '/:columnId',
  validateBody(updateColumnSchema),
  ctrlWrapper(updateColumnController),
);
