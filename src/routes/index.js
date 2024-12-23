import { Router } from 'express';
import { boardsRouter } from './boards.js';
import { columnsRouter } from './columns.js';

export const rootRouter = Router();

rootRouter.use('/boards', boardsRouter);
rootRouter.use('/columns', columnsRouter);
